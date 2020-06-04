import {
  SAVE_PRODUCTS
} from '../constants/ActionTypes'

const products = (state = [], action) => {
  const { type, data } = action
  switch (type) {
    case SAVE_PRODUCTS:
      return data
    default:
      return state
  }
}

export default products
