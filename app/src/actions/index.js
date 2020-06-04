import * as Types from '../constants/ActionTypes'

// Profile Actions
export const updateProfile = data => ({
  type: Types.UPDATE_PROFILE,
  data
})

// Product Actions
export const saveProducts = data => ({
  type: Types.SAVE_PRODUCTS,
  data
})

// Feedback Actions
export const saveFeedback = ({ status = 'opening', data }) => ({
  type: Types.SAVE_FEEDBACK,
  status,
  data
})
