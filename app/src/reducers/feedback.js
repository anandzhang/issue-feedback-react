import {
  SAVE_FEEDBACK
} from '../constants/ActionTypes'

const initialState = {
  opening: [],
  closed: []
}

const feedback = (state = initialState, action) => {
  const { type, status, data } = action
  switch (type) {
    case SAVE_FEEDBACK:
      return {
        ...state,
        [status]: data
      }
    default:
      return state
  }
}

export default feedback
