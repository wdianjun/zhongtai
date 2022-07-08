
// 1.导入cookies操作的方法，存储token，考虑兼容问题，不考虑建议使用localStorage
import { getToken, setToken, removeToken } from '@/utils/auth'
// 导入登录接口
import { getUserInfo, login } from '@/api/user'
const state = {
  // 初始值从cookies拿
  token: getToken(),
  // 定义一个存放用户信息的变量(因为userInfo拿到的是一个对象，所以初始值也给一个对象，防止报错)
  userInfo: {}
}

const mutations = {
  // 2.定义存储token方法
  setToken (state, token) {
    state.token = token
    // 同步缓存
    setToken(token)
  },
  // 清空token的方法
  removeToken (state) {
    state.token = null
    removeToken()
  },
  // 定义一个修改用户信息的方法
  setUserInfo (state, data) {
    state.userInfo = data // 是响应式
    // 或者浅拷贝也是响应式 state.userInfo = {...state.name,...data}
  },
  // 定义一个删除userInfo的方法，为了给退出登录使用
  removeUserInfo () {
    state.userInfo = {}
  }
}

const actions = {
  async login ({ commit }, payLoad) {
    // 1.发请求拿数据
    const res = await login(payLoad)
    // 2.判断success属性，如果为true，就设置token
    commit('setToken', res) // 因为在响应拦截器统一做了数据的过滤操作，所以res拿到的就是token
  },
  // 获取用户信息
  async getUserInfo ({ commit }, payLoad) {
    // 不许需要写try catch了，因为全局响应拦截器已经处理好报错信息了
    const data = await getUserInfo()
    // 调mutations修改userInfo的方法
    commit('setUserInfo', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

