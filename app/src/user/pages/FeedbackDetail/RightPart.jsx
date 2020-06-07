import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Card } from 'antd'
import SimpleList from '../../../comon/SimpleList'

const RightPart = ({ openingFeedback }) => (
  <Col span={6}>
    <Card title='其他反馈'>
      <SimpleList dataSource={openingFeedback} itemName='title' />
    </Card>
  </Col>
)

RightPart.propTypes = {
  openingFeedback: PropTypes.array
}

export default connect(
  ({ feedback }) => ({ openingFeedback: feedback.opening })
)(RightPart)
