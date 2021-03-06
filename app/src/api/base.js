import Api from './Api'
import {
  ACCOUNT,
  PROFILE,
  PRODUCT,
  FEEDBACK,
  COMMENT,
  STATISTICS
} from './config'
import Storage from '../utils/Storage'
import axios from 'axios'

// Account Request
export const requestSendCode = data => Api.request(...ACCOUNT.SEND_CODE, data)
export const requestRegister = data => Api.request(...ACCOUNT.REGISTER, data)
export const requestLogin = data => Api.request(...ACCOUNT.LOGIN, data)
export const requestUserRole = userId => {
  const config = [...ACCOUNT.ROLE]
  config[0] = config[0].replace('<user_id>', userId)
  return Api.request(...config)
}

// Profile Request
export const requsetProfile = userId => {
  const config = [...PROFILE.GET]
  config[0] = config[0].replace('<user_id>', userId)
  return Api.request(...config)
}
export const requestUpdateProfile = async data => {
  const config = [...PROFILE.UPDATE]
  config[0] = config[0].replace('<user_id>', Storage.get('userId'))
  return Api.request(...config, data)
}

// Product Request
export const requestCreateProduct = data => {
  data.manager_id = Storage.get('userId')
  return Api.request(...PRODUCT.CREATE, data)
}
export const requestProductList = () => Api.request(...PRODUCT.LIST)
export const requestUpdateProduct = (productId, data) => {
  const config = [...PRODUCT.UPDATE]
  config[0] = config[0].replace('<product_id>', productId)
  data.manager_id = Storage.get('userId')
  return Api.request(...config, data)
}
export const requestDeleteProduct = productId => {
  const config = [...PRODUCT.DELETE]
  config[0] = config[0].replace('<product_id>', productId)
  return Api.request(...config, { manager_id: Storage.get('userId') })
}

// Feedback Request
export const requestCreateFeedback = data => {
  data.owner_id = Storage.get('userId')
  return Api.request(...FEEDBACK.CREATE, data)
}
export const requestFeedbackList = data => {
  const config = [...FEEDBACK.LIST]
  config[0] = config[0].replace('<product_id>', data.product_id)
  delete data.product_id
  return Api.request(...config, data)
}
export const requestVoteFeedback = data => {
  const config = [...FEEDBACK.VOTE]
  config[0] = config[0].replace('<issue_id>', data.issue_id)
  delete data.issue_id
  data.user_id = Storage.get('userId')
  return Api.request(...config, data)
}
export const requestFeedbackDetail = id => {
  const config = [...FEEDBACK.DETAIL]
  config[0] = config[0].replace('<issue_id>', id)
  return Api.request(...config)
}
export const requestUpdateFeedback = data => {
  const config = [...FEEDBACK.UPDATE]
  config[0] = config[0].replace('<issue_id>', data.issue_id)
  delete data.issue_id
  data.owner_id = Storage.get('userId')
  return Api.request(...config, data)
}
export const requestUpdateTags = (id, tags) => {
  const config = [...FEEDBACK.TAG]
  config[0] = config[0].replace('<issue_id>', id)
  return Api.request(...config, { tags_name: tags })
}
export const requestNotAssignedDeveloperList = feedbackId => {
  const config = [...FEEDBACK.DEVELOPER_LIST]
  config[0] = config[0].replace('<issue_id>', feedbackId)
  return Api.request(...config)
}
export const requestAssignFeedback = (feedbackId, developers) => {
  const config = [...FEEDBACK.ASSIGN]
  config[0] = config[0].replace('<issue_id>', feedbackId)
  return Api.request(...config, { developer_ids: developers })
}
export const requestUpdateFeedbackStatus = (feedbackId, status) => {
  const config = [...FEEDBACK.UPDATE_STATUS]
  config[0] = config[0].replace('<issue_id>', feedbackId)
  const userId = Storage.get('userId')
  return Api.request(...config, { user_id: userId, status })
}
export const requestUserFeedbackList = () => {
  const config = [...FEEDBACK.USER_LIST]
  config[0] = config[0].replace('<user_id>', Storage.get('userId'))
  return Api.request(...config)
}
export const requestUserOpinion = feedbackId => {
  const userId = Storage.get('userId')
  if (!userId) return Promise.resolve({ opinion: '' })
  const config = [...FEEDBACK.OPINION]
  config[0] = config[0].replace('<issue_id>', feedbackId)
  config[0] = config[0].replace('<user_id>', Storage.get('userId'))
  return Api.request(...config)
}

// Comment Request
export const requestCreateComment = data => {
  data.user_id = Storage.get('userId')
  return Api.request(...COMMENT.CREATE, data)
}
export const requestCommentList = id => {
  const config = [...COMMENT.LIST]
  config[0] = config[0].replace('<issue_id>', id)
  return Api.request(...config)
}

// statistics Request
export const requestUserStatistic = () => {
  const config = [...STATISTICS.USER]
  config[0] = config[0].replace('<user_id>', Storage.get('userId'))
  return Api.request(...config, null, true)
}
export const requestManagerStatistic = () => {
  const config = [...STATISTICS.MANAGER]
  config[0] = config[0].replace('<manager_id>', Storage.get('userId'))
  return Api.request(...config, null, true)
}
export const requestDeveloperStatistic = () => {
  const config = [...STATISTICS.DEVELOPER]
  config[0] = config[0].replace('<developer_id>', Storage.get('userId'))
  return Api.request(...config, null, true)
}

// service API 暂用于测试
axios.interceptors.response.use(response => response.data)
export const testSendCode = data => {
  return axios.post('/api/service/v1/account/send_code', data)
}
export const testRegister = data => {
  return axios.post('/api/service/v1/account', data)
}
export const testDeveloperFeedbackList = () => {
  const userId = Storage.get('userId')
  return axios.get(`/api/service/v1/issue/developer/${userId}`)
}
