import * as Types from '../constants/ActionTypes'

const initialState = {
  roleId: '',
  nickname: '',
  gender: 1,
  avatar: ''
}

const profile = (state = initialState, action) => {
  const { type, data } = action
  switch (type) {
    case Types.UPDATE_PROFILE:
      return { ...state, ...data }
    default:
      return state
  }
}

export default profile
