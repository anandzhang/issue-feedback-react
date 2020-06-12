import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts, getFeedback } from '../../../actions'
import { Card, Table, Button, message } from 'antd'
import CardTitle from './CardTitle'
import AssignModal from './AssignModal'
import columns from './columns'
import STATUS from '../../../constants/Status'
import { requestUpdateFeedbackStatus } from '../../../api/base'

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

  const showAssignModal = () => assignModal.current.changeVisible()

  const modifyFeedbackStatus = async (id, status) => {
    let msg = ''
    if (status === STATUS.OPENING) {
      status = STATUS.CLOSED
      msg = '关闭'
    } else {
      status = STATUS.OPENING
      msg = '开启'
    }
    try {
      await requestUpdateFeedbackStatus(id, status)
      message.success(`${msg}成功`)
    } catch {
      message.error(`${msg}失败`)
    }
  }

  // 添加自定义操作列
  const newColumns = [...columns]
  newColumns.push({
    title: '操作',
    width: 160,
    /* eslint-disable react/display-name, react/prop-types */
    render: feedback => {
      const {
        issue_id: feedbackId,
        status,
        developers: assignedDevelopers
      } = feedback
      return (
        <>
          <Button
            type='link'
            onClick={showAssignModal}
          >
            分配
          </Button>
          <AssignModal
            ref={assignModal}
            feedbackId={feedbackId}
            assignedDevelopers={assignedDevelopers}
          />
          <Button
            type='link'
            onClick={() => modifyFeedbackStatus(feedbackId, status)}
          >
            {status === STATUS.OPENING ? '关闭' : '开启'}
          </Button>
        </>
      )
    }
  })

  return (
    <Card
      title={<CardTitle products={products} />}
    >
      <Table
        dataSource={feedback}
        columns={newColumns}
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
