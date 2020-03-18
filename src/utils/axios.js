import axios from 'axios'
import { Loading } from 'element-ui'
export const baseURL = 'http://157.122.54.189:9095'
axios.defaults.baseURL = baseURL
// 添加请求拦截器
let num = 0
let loadingInstance
axios.interceptors.request.use(

  function (config) {
    // 在发送请求之前做些什么
    loadingInstance = Loading.service({ text: '页面正在加载中' })
    num++
    console.log('请求开始')
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    num--
    if (num === 0) {
      console.log('请求结束')
      loadingInstance.close()
    }
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default axios
