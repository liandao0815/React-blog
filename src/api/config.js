import axios from 'axios'

const _axios = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000
})

_axios.interceptors.request.use(
  config => {
    const token = window.localStorage ? window.localStorage.getItem('token') : ''

    config.headers.Authorization = `Bearer ${token}`

    return config
  },
  error => Promise.reject(error)
)

_axios.interceptors.response.use(
  response => response,
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          error.message = '未授权，请登陆'
          break
        case 404:
          error.message = '找不到指定资源'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        default:
      }
    }
    return Promise.reject(error)
  }
)

export default _axios
