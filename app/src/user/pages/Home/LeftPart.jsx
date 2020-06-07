import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col } from 'antd'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'
import MetaList from '../../../comon/MetaList'

const actions = [
  { icon: <LikeOutlined />, textIndex: 'likes' },
  // TODO: 后端暂无评论总数
  { icon: <MessageOutlined />, textIndex: 'comments' }
]

const LeftPart = ({ feedback }) => (
  <Col span={18}>
    <MetaList
      dataSource={feedback}
      itemStyle={stylesheet.listItem}
      actions={actions}
      titleHref={['/feedback', 'issue_id']}
    />
  </Col>
)

const stylesheet = {
  listItem: {
    margin: '10px 0',
    padding: 24,
    border: '1px solid #f0f0f0'
  }
}

LeftPart.propTypes = {
  feedback: PropTypes.array
}

export default connect(
  ({ feedback }) => ({ feedback: feedback.opening })
)(LeftPart)
