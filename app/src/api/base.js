import Api from './Api'
import {
  ACCOUNT,
  PROFILE,
  PRODUCT,
  FEEDBACK
} from './config'
import Storage from '../utils/Storage'
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

// Product Request
export const requestCreateProduct = data => {
  const userId = Storage.get('userId')
  return Api.request(...PRODUCT.CREATE, { manager_id: userId, ...data })
}
export const requestProductList = () => Api.request(...PRODUCT.LIST)

// Feedback Request
export const requestCreateFeedback = data => {
  const userId = Storage.get('userId')
  return Api.request(...FEEDBACK.CREATE, { owner_id: userId, ...data })
}
export const requestFeedbackList = data => {
  const config = FEEDBACK.LIST
  config[0] = config[0].replace('<product_id>', data.product_id)
  delete data.product_id
  return Api.request(...config, data)
}

// service API 暂用于测试
axios.interceptors.response.use(response => response.data)
export const testSendCode = data => {
  return axios.post('/api/service/v1/account/send_code', data)
}
