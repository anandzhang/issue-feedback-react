import { combineReducers } from 'redux'
import profile from './profile'
import products from './products'
import feedback from './feedback'
import comments from './comments'

export default combineReducers({
  profile,
  products,
  feedback,
  comments
})
