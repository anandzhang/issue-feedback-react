import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { saveProducts, saveFeedback } from '../../../actions'
import { Row, message } from 'antd'
import { requestFeedbackList, requestProductList } from '../../../api/base'
import Banner from '../../components/Banner'
import LeftPart from './LeftPart'
import RightPart from './RightPart'

const Home = props => {
  const { products, saveProducts, saveFeedback } = props

  useEffect(() => {
    getProducts()
  }, [])
  useEffect(() => {
    if (products.length !== 0) {
      const { product_id: productId } = products[0]
      getFeedback(productId)
      getFixed(productId)
    }
  }, [products])

  const getProducts = async () => {
    try {
      const { products } = await requestProductList()
      saveProducts(products)
    } catch (err) {
      message.error(err)
    }
  }

  const getFeedback = async productId => {
    try {
      const { issues } = await requestFeedbackList({
        product_id: productId,
        status: 'opening'
      })
      saveFeedback({ status: 'opening', data: issues })
    } catch (err) {
      message.error(err)
    }
  }

  const getFixed = async productId => {
    try {
      const { issues } = await requestFeedbackList({
        product_id: productId,
        status: 'closed'
      })
      saveFeedback({ status: 'closed', data: issues })
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <>
      <Banner />
      <Row gutter={12}>
        <LeftPart />
        <RightPart />
      </Row>
    </>
  )
}

Home.propTypes = {
  products: PropTypes.array,
  saveProducts: PropTypes.func,
  saveFeedback: PropTypes.func
}

export default connect(
  ({ products }) => ({ products }),
  { saveProducts, saveFeedback }
)(Home)
