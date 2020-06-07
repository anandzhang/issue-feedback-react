import {
  SAVE_COMMENTS,
  ADD_COMMENT
} from '../constants/ActionTypes'

const comments = (state = [], action) => {
  const { type, data } = action
  switch (type) {
    case SAVE_COMMENTS:
      return data
    case ADD_COMMENT:
      return [...state, data]
    default:
      return state
  }
}

export default comments
