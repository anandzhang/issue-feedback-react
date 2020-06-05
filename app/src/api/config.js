export const SERVER_URL = '/api/v1'

const config = (url, method = 'GET') => [url, method]

export const ACCOUNT = {
  SEND_CODE: config('/account/send_code', 'POST'),
  REGISTER: config('/account', 'POST'),
  LOGIN: config('/login', 'POST')
}

export const PROFILE = {
  GET: config('/profile/<user_id>'),
  UPDATE: config('/profile/<user_id>', 'PUT')
}

export const PRODUCT = {
  CREATE: config('/product', 'POST'),
  LIST: config('/products'),
  LIST_BY_MANAGER: config('/product/manager/<manager_id>')
}

export const FEEDBACK = {
  CREATE: config('/issue', 'POST'),
  VOTE: config('/issue/<issue_id>/vote', 'PUT'),
  LIST: config('/issue/product/<product_id>'),
  DETAIL: config('/issue/<issue_id>')
}
