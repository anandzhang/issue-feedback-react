import * as Types from '../constants/ActionTypes'

// Profile Actions
export const updateProfile = data => ({
  type: Types.UPDATE_PROFILE,
  data
})

export const saveProducts = data => ({
  type: Types.SAVE_PRODUCTS,
  data
})
