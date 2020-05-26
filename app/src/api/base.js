import Api from './Api'
import {
  ACCOUNT,
  PROFILE
} from './config'
import Storage from '../utils/Storage'

// Account Request
export const requestSendCode = data => Api.request(...ACCOUNT.SEND_CODE, data)
export const requestRegister = data => Api.request(...ACCOUNT.REGISTER, data)
export const requestLogin = data => Api.request(...ACCOUNT.LOGIN, data)

// Profile Request
export const requsetProfile = () => {
  const userId = Storage.get('userId')
  const config = ACCOUNT.GET
  config.url = config.url.replace('<user_id>', userId)
  return Api.request(...config)
}

export const requestUpdateProfile = async data => {
  const userId = Storage.get('userId')
  return Api.request(...PROFILE.UPDATE, { user_id: userId, ...data })
}
