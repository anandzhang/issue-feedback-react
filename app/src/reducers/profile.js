import {
  UPDATE_PROFILE,
  RESET_PROFILE
} from '../constants/ActionTypes'

const initialState = {
  roleId: '',
  nickname: '',
  gender: 1,
  avatar: ''
}

const profile = (state = initialState, action) => {
  const { type, data } = action
  switch (type) {
    case UPDATE_PROFILE:
      return { ...state, ...data }
    case RESET_PROFILE:
      return initialState
    default:
      return state
  }
}

export default profile
