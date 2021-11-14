import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://edufront.lagou.com'
})

// 标记token 刷新状态
let isRefreshing = false
// 存储刷新时等待的请求
let requests = []

// 设置请求拦截器进行接口鉴权
request.interceptors.request.use(config => {
  // 读取store中存储的user数据
  const { user } = store.state
  // 检测user是否存在数据，如果有，则进行token设置
  if (user && user.access_token) {
    // 如果user中存在access_token,则设置给请求头的Authorization字段
    config.headers.Authorization = user.access_token
  }
  return config
})

// 设置响应拦截器进行token过期处理
request.interceptors.response.use(response => {
  return response
}, async error => {
  // 存在响应内容，但是出错
  if (error.response) {
    // 检测状态吗是否为401
    if (error.response.status === 401) {
      // 检测是否存在用户的登录信息
      if (!store.state.user) {
        // 如果不存在，结束即可
        return Promise.reject(error)
      }

      // 发送请求前检测，是否已经存在刷新token的请求了
      if (isRefreshing) {
        return requests.push(() => {
          // error.config 指的是失败请求的配置对象
          request(error.config)
        })
      }

      isRefreshing = true
      // 发送请求，尝试刷新token
      const { data } = await request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: new window.URLSearchParams({
          refreshtoken: store.state.refresh_token
        }).toString()
      })

      if (data.state !== 1) {
        // 刷新token失败
        store.commit('setUser', null)
        return Promise.reject(error)
      }

      // 刷新tokne成功
      store.commit('setUser', data.content)

      // 将requests中的所有请求重新发送
      // requests中存储的时函数，所以遍历的时候，对每一项都执行一下
      requests.forEach(callback => callback())
      requests = []
      isRefreshing = false
      return request(error.config)
    }
  }
})

export default request
