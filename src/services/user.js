import request from '@/utils/request'
import qs from 'qs'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // qs.stringify把一个参数对象格式化一个字符串eg:'c=b&a=d'
    data: qs.stringify(data)
  })
}
