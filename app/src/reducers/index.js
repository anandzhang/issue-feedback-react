import { combineReducers } from 'redux'
import profile from './profile'
import products from './products'
import feedback from './feedback'

export default combineReducers({
  profile,
  products,
  feedback
})
