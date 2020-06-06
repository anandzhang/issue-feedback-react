import React from 'react'
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

export default connect(
  ({ feedback }) => ({ openingFeedback: feedback.opening })
)(RightPart)
