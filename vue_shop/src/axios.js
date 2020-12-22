import axios from 'axios'

export default {
  install: function (vue) {
    var auth = vue.prototype.$auth
    // 创建一个axios
    var result = axios.create ({
      baseURL: 'http://tpadmin.test/api/'
    })
    // 添加请求拦截器去处理添加Authorization 添加了一个请求头headers的信息
    // 将localSession里的数据加到了请求头
    result.interceptors.request.use(config => {
      config.headers.Authorization = auth.getAuthorization()
      return config
    })
    vue.prototype.$http = result
  }
}
