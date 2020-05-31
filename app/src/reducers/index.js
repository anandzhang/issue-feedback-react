import { combineReducers } from 'redux'
import products from './products'
import feedback from './feedback'

export default combineReducers({
  products,
  feedback
})
