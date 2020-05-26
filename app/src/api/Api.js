import Axios from 'axios'
import Storage from '../utils/Storage'
import { SERVER_URL } from './config'

const axios = Axios.create({
  baseURL: SERVER_URL,
  headers: {
    Authorization: Storage.get('token')
  }
})

axios.interceptors.response.use(response => {
  const { data } = response
  const { ok, message, result } = data
  if (ok) {
    return result
  } else {
    return Promise.reject(message)
  }
}, ({ response }) => {
  const { status, statusText } = response
  const err = `${status} ${statusText}`
  return Promise.reject(err)
})

class Api {
  static async request (url, method = 'GET', data = {}) {
    const config = { url, method, data }
    if (data && method.toUpperCase === 'GET') {
      delete config.data
      config.params = data
    }
    return axios(config)
  }
}

export default Api
