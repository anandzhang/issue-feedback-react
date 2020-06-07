import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts, getFeedback } from '../../../actions'
import { Row } from 'antd'
import Banner from '../../components/Banner'
import LeftPart from './LeftPart'
import RightPart from './RightPart'

const Home = props => {
  const { products, getProducts, getFeedback } = props
  useEffect(() => {
    getProducts()
  }, [])
  useEffect(() => {
    if (products.length !== 0) {
      const { product_id: productId } = products[0]
      getFeedback(productId, 'opening')
      getFeedback(productId, 'closed')
    }
  }, [products])

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
  getProducts: PropTypes.func,
  getFeedback: PropTypes.func
}

export default connect(
  ({ products }) => ({ products }),
  { getProducts, getFeedback }
)(Home)
