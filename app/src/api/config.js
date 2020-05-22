const SERVER_URL = '/api/v1'

const createURL = path => `${SERVER_URL}${path}`

export const ACCOUNT_URL = {
  // TODO: /service/v1 为服务端内部API 暂用于测试
  SEND_CODE: '/api/service/v1/account/send_code',
  REGISTER: createURL('/account'),
  LOGIN: createURL('/login')
}

export const PROFILE_URL = {
  GET: createURL('/profile'),
  UPDATE: createURL('/profile')
}
