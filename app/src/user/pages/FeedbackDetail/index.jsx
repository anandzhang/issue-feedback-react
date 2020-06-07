import React from 'react'
import { Row } from 'antd'
import LeftPart from './LeftPart'
import RightPart from './RightPart'

const FeedbackDetail = () => (
  <Row gutter={12} style={stylesheet.content}>
    <LeftPart />
    <RightPart />
  </Row>
)

const stylesheet = {
  content: {
    marginTop: 20
  }
}

export default FeedbackDetail
