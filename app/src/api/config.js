export const SERVER_URL = '/api/v1'

const config = (url, method = 'GET') => [url, method]

export const ACCOUNT = {
  SEND_CODE: config('/account/send_code', 'POST'),
  REGISTER: config('/account', 'POST'),
  LOGIN: config('/login', 'POST'),
  ROLE: config('/account/<user_id>/role')
}

export const PROFILE = {
  GET: config('/profile/<user_id>'),
  UPDATE: config('/profile/<user_id>', 'PUT')
}

export const PRODUCT = {
  CREATE: config('/product', 'POST'),
  LIST: config('/products'),
  LIST_BY_MANAGER: config('/product/manager/<manager_id>'),
  UPDATE: config('/product/<product_id>', 'PUT'),
  DELETE: config('/product/<product_id>', 'DELETE')
}

export const FEEDBACK = {
  CREATE: config('/issue', 'POST'),
  VOTE: config('/issue/<issue_id>/vote', 'PUT'),
  LIST: config('/issue/product/<product_id>'),
  DETAIL: config('/issue/<issue_id>'),
  TAG: config('/issue/<issue_id>/tag', 'PUT'),
  DEVELOPER_LIST: config('/issue/<issue_id>/developers'),
  ASSIGN: config('/issue/<issue_id>/assign', 'PUT')
}

export const COMMENT = {
  CREATE: config('/comment', 'POST'),
  LIST: config('/comments/<issue_id>')
}
