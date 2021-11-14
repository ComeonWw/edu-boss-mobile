import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    name: 'course',
    component: () => import(/* webpackChunkName: 'course' */'@/views/course/index')
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn/index'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/user/index'),
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫进行登录检测与跳转
router.beforeEach((to, from, next) => {
  // 验证to路由受否需要进行身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 验证Vux的store中的登录用户信息是否存储
    if (!store.state.user) {
      // 未登录，跳转到登录页面
      return next({
        // 导航守卫跳转login同时传递跳转信息
        // 登录成功后根据信息跳转到对应页面即可
        name: 'login',
        query: {
          // 将本次路由的fullpath传递给login页面
          redirect: to.fullPath
        }
      })
    }
    // 已经登录，允许通过
    next()
  } else {
    // 不需要验证登录的情况
    next()
  }
})

export default router
