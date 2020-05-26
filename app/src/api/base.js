import Api from './Api'
import {
  ACCOUNT,
  PROFILE
} from './config'
import Storage from '../utils/Storage'

// service API 暂用于测试
import axios from 'axios'

// Account Request
export const requestSendCode = data => Api.request(...ACCOUNT.SEND_CODE, data)
export const requestRegister = data => Api.request(...ACCOUNT.REGISTER, data)
export const requestLogin = data => Api.request(...ACCOUNT.LOGIN, data)

// Profile Request
export const requsetProfile = userId => {
  const config = PROFILE.GET
  config[0] = config[0].replace('<user_id>', userId)
  return Api.request(...config)
}

export const requestUpdateProfile = async data => {
  const userId = Storage.get('userId')
  return Api.request(...PROFILE.UPDATE, { user_id: userId, ...data })
}
axios.interceptors.response.use(response => response.data)
export const testFeedbackList = () => {
  return axios.get('/feedback.json')
}
export const testFixedList = data => {
  return axios.get('/fixed.json')
}
export const testSendCode = data => {
  return axios.post('/api/service/v1/account/send_code', data)
}
