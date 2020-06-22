import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Card } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
// import SimpleList from '../../../comon/SimpleList'

const RightPart = ({ openingFeedback }) => (
  <Col span={6}>
    <Card title='其他反馈'>
      {/* // TODO: openingFeedback 状态刷新页面丢失 */}
      {/* <SimpleList dataSource={openingFeedback} itemName='title' /> */}
      <ExclamationCircleOutlined /> 该功能暂不开发
    </Card>
  </Col>
)

RightPart.propTypes = {
  openingFeedback: PropTypes.array
}

export default connect(
  ({ feedback }) => ({ openingFeedback: feedback.opening })
)(RightPart)
