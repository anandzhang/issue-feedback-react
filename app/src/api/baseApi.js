import axios from 'axios'
import { ACCOUNT_URL } from './config'

axios.interceptors.response.use(response => response.data)

export const requestRegister = async data => {
  return await axios.post(ACCOUNT_URL.REGISTER, data)
}

export const requestLogin = async data => {
  return await axios.post(ACCOUNT_URL.LOGIN, data)
}
