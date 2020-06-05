import Api from './Api'
import {
  ACCOUNT,
  PROFILE,
  PRODUCT,
  FEEDBACK,
  COMMENT
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
  data.user_id = Storage.get('userId')
  return Api.request(...PROFILE.UPDATE, data)
}

// Product Request
export const requestCreateProduct = data => {
  data.manager_id = Storage.get('userId')
  return Api.request(...PRODUCT.CREATE, data)
}
export const requestProductList = () => Api.request(...PRODUCT.LIST)

// Feedback Request
export const requestCreateFeedback = data => {
  data.owner_id = Storage.get('userId')
  return Api.request(...FEEDBACK.CREATE, data)
}
export const requestFeedbackList = data => {
  const config = FEEDBACK.LIST
  config[0] = config[0].replace('<product_id>', data.product_id)
  delete data.product_id
  return Api.request(...config, data)
}
export const requestVoteFeedback = data => {
  const config = FEEDBACK.VOTE
  config[0] = config[0].replace('<issue_id>', data.issue_id)
  delete data.issue_id
  data.user_id = Storage.get('userId')
  return Api.request(...config, data)
}
export const requestFeedbackDetail = id => {
  const config = FEEDBACK.DETAIL
  config[0] = config[0].replace('<issue_id>', id)
  return Api.request(...config)
}

// Comment Request
export const requestCreateComment = data => {
  data.user_id = Storage.get('userId')
  return Api.request(...COMMENT.CREATE, data)
}
export const requestCommentList = id => {
  const config = COMMENT.LIST
  config[0] = config[0].replace('<issue_id>', id)
  return Api.request(...config)
}

// service API 暂用于测试
axios.interceptors.response.use(response => response.data)
export const testSendCode = data => {
  return axios.post('/api/service/v1/account/send_code', data)
}
