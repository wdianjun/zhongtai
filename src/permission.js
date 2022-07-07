// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async (to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })

// 导入路由
import router from '@/router'
// 导入vuex
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
// 定义一个白名单
const whiteList = ['/login', '/404']
// 前置守卫
router.beforeEach((to, from, next) => {
  // 先判断有没有token ,使用快捷访问
  if (store.getters.token) {
    // 开启进度条
    NProgress.start()
    // 有token，判断是否去登录页
    if (to.path === '/login') {
      // 如果去的是登录页，则要跳到首页
      next({ path: '/' })
    } else {
      // 有token，不是去登录页则放行，想去哪就去哪
      next()
    }
  } else {
    // 如果没有token，需要判断是否在白名单里
    if (whiteList.includes(to.path)) {
      // 如果去的页面在白名单则放行
      next()
    } else {
      // 如果不在白名单，则需要跳到登录页
      next('/login')
    }
  }
  // 手动关闭进度条
  NProgress.done()
})
// 路由自己跳自己（被复用的时候）只会触发一个钩子函数beforerouteUpdate(){},在组件内使用的
router.afterEach(() => {
  // NProgress.done()
})
