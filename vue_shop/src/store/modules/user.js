export default {
  state: {
    id: 0,
    username: ''
  },
  // mutations,里面装着一些改变数据方法的集合
  mutations: {
    setUser (state, user) {
      state.id = user.id
      state.username = user.username
    },
    logout (state) {
      state.id = 0
      state.username = ''
    }
  },
  actions: {},
  // getters是store的计算属性
  getters: {
    isLogin (state) {
      return state.id !== 0
    }
  },
  namespaced: true
}
