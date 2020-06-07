import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts, getFeedback } from '../../../actions'
import { Card, Table } from 'antd'
import CardTitle from './CardTitle'
import columns from './columns'

const Feedback = props => {
  const { products, feedback, getProducts, getFeedback } = props
  useEffect(() => {
    getProducts()
  }, [])
  useEffect(() => {
    if (products.length !== 0) {
      const productId = products[0].product_id
      getFeedback(productId, 'opening')
      getFeedback(productId, 'closed')
    }
  }, [products])

  return (
    <Card
      title={<CardTitle products={products} />}
    >
      <Table
        dataSource={feedback}
        columns={columns}
        rowKey='issue_id'
      />
    </Card>
  )
}

Feedback.propTypes = {
  products: PropTypes.array,
  feedback: PropTypes.array,
  getProducts: PropTypes.func,
  getFeedback: PropTypes.func
}

export default connect(
  ({ products, feedback }) => ({
    products,
    feedback: [...feedback.opening, ...feedback.closed]
  }),
  { getProducts, getFeedback }
)(Feedback)
