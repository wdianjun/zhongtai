
// 1.导入cookies操作的方法，存储token，考虑兼容问题，不考虑建议使用localStorage
import { getToken, setToken, removeToken } from '@/utils/auth'
// 导入登录接口
import { login } from '@/api/user'
const state = {
  // 初始值从cookies拿
  token: getToken()
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
  }
}

const actions = {
  async login ({ commit }, payLoad) {
    // 1.发请求拿数据
    const res = await login(payLoad)
    // 2.判断success属性，如果为true，就设置token
    commit('setToken', res) // 因为在响应拦截器统一做了数据的过滤操作，所以res拿到的就是token
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

