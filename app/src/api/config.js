const SERVER_URL = '/api/v1'

const createURL = path => `${SERVER_URL}${path}`

export const ACCOUNT_URL = {
  REGISTER: createURL('/account'),
  LOGIN: createURL('/login')
}
