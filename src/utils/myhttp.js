import Vue from 'vue'
// 导入axios 并封装
import axios from 'axios'
// 导入vuex
import store from '@/store'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  const token = store.state.userInfo.token
  if (token) {
    config.headers.Authorization = token
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

Vue.prototype.$axios = axios
export default axios
