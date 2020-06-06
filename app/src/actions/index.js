import * as Types from '../constants/ActionTypes'
import { requestFeedbackList, requestProductList } from '../api/base'

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

export const getProducts = () => async dispatch => {
  try {
    const { products } = await requestProductList()
    dispatch(saveProducts(products))
  } catch {
    const errMsg = '获取产品列表失败'
    return Promise.reject(errMsg)
  }
}

// Feedback Actions
export const saveFeedback = ({ status = 'opening', data }) => ({
  type: Types.SAVE_FEEDBACK,
  status,
  data
})

export const getFeedback = (productId, status) => async dispatch => {
  try {
    const { issues } = await requestFeedbackList({
      product_id: productId,
      status
    })
    dispatch(saveFeedback({ status, data: issues }))
  } catch {
    const errMsg = `获取${status === 'opening' ? '未解决' : '已解决'}的反馈列表失败`
    return Promise.reject(errMsg)
  }
}
