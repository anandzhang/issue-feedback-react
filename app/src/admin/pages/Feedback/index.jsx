import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts, getFeedback } from '../../../actions'
import { Card, Table, Button } from 'antd'
import CardTitle from './CardTitle'
import columns from './columns'
import AssignModal from './AssignModal'

const Feedback = props => {
  const assignModal = useRef(null)
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

  columns.push({
    title: '操作',
    /* eslint-disable react/display-name, react/prop-types */
    render: feedback => {
      const {
        issue_id: feedbackId,
        developer_ids: assignedDevelopers
      } = feedback
      return (
        <>
          <Button
            type='link'
            onClick={() => assignModal.current.changeVisible()}
          >
            分配
          </Button>
          <AssignModal
            ref={assignModal}
            feedbackId={feedbackId}
            assignedDevelopers={assignedDevelopers}
          />
        </>
      )
    },
    width: 100
  })

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
