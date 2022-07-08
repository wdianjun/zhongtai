const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token // 快捷访问，user是模块名字 （这里我们可以也不用快捷访问，直接在组件调用...MapState('user',['token']) ）
  // name: state => state.user.userInfo.username // 建立用户名称的映射
}
export default getters
