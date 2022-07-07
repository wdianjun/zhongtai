import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  // baseURL配置根路径 本机localhost:8888(项目) 向 本机localhost:8888/api发请求（变成了proxy代理服务器）
  // proxy代理服务器监听到localhost:8888/api就会向目标的服务器（在vue.config.js配置）发请求
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// 添加请求拦截器 作用：统一注入token
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么

  return Promise.reject(error)
})

// 添加响应拦截器 作用：无感刷新、统一处理错误、统一对数据进行过滤
service.interceptors.response.use(function (response) {
  // response接收的是axios包装后的服务器返回的数据
  const { data } = response
  // 对响应数据做点什么
  const { success, message } = data
  // 2.继续判断服务器响应成功之后，这个success到底是true还是false
  if (success) {
    return data.data
  } else {
    // 如果是操作错误new 一个错误提示对象
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, function (error) {
  // 对响应错误做点什么
  // 该抛出的错误继续往后抛，可以被后面的异步请求里面的catch捕获
  // 1.全局提示错误信息，利用饿了么ui提供的错误信息组件
  // error是网络错误，有status，有message
  Message.error(error.message)
  return Promise.reject(error)
})
export default service
