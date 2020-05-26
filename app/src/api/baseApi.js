import axios from 'axios'
import Storage from '../utils/Storage'
import { ACCOUNT_URL, PROFILE_URL } from './config'
import Api from './Api'

axios.interceptors.response.use(response => response.data)

export const requestSendCode = async data => {
  return await axios.post(ACCOUNT_URL.SEND_CODE, data)
}

export const requestRegister = async data => {
  return await axios.post(ACCOUNT_URL.REGISTER, data)
}

export const requestLogin = async data => {
  return Api.request('/login', 'POST', data)
}

export const requsetProfile = async () => {
  const userId = Storage.get('userId')
  return await axios.get(`${PROFILE_URL.GET}/${userId}`)
}

export const requestUpdateProfile = async data => {
  const userId = Storage.get('userId')
  return await axios.put(PROFILE_URL.UPDATE, { user_id: userId, ...data })
}
