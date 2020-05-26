export const SERVER_URL = '/api/v1'

const config = (url, method = 'GET') => ({ url, method })

export const ACCOUNT = {
  SEND_CODE: config('/account/send_code', 'POST'),
  REGISTER: config('/account', 'POST'),
  LOGIN: config('/login', 'POST')
}

export const PROFILE = {
  GET: config('/profile'),
  UPDATE: config('/profile/<user_id>', 'PUT')
}

export const FEEDBACK = {
  CREATE: config('/issue', 'POST'),
  VOTE: config('/issue/<issue_id>/user/<user_id>/vote', 'PUT'),
  LIST: config('/issue/product/<product_id>/opening')
}

export const PRODUCT = {
  CREATE: config('/product', 'POST'),
  LIST: config('/products'),
  LIST_BY_MANAGER: config('/product/manager/<manager_id>')
}
