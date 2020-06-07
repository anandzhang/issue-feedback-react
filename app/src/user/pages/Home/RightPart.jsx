import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Card, Button } from 'antd'
import CenterStatistic from '../../../comon/CenterStatistic'
import SimpleList from '../../../comon/SimpleList'
import AddModal from './AddModal'

// TODO: 后端暂无统计接口
const statisticDataSource = [
  {
    title: '被赞同',
    value: 66
  },
  {
    title: '提出反馈',
    value: 88
  }
]

const RightPart = props => {
  const { feedback, nickname } = props
  const addModal = React.useRef(null)

  return (
    <Col span={6}>
      <Card style={stylesheet.marginX10}>
        {nickname
          ? (
            <CenterStatistic
              dataSource={statisticDataSource}
              style={stylesheet.marginBottom20}
            />
          )
          : ''}
        <Button
          type='primary'
          onClick={() => addModal.current.changeVisible()}
          style={stylesheet.feedbackBtn}
        >
          反馈一下
        </Button>
      </Card>
      <Card title='最新动态'>
        <SimpleList dataSource={feedback} itemName='title' />
      </Card>
      <AddModal ref={addModal} />
    </Col>
  )
}

const stylesheet = {
  marginX10: {
    margin: '10px 0'
  },
  marginBottom20: {
    marginBottom: 20
  },
  feedbackBtn: {
    display: 'block',
    margin: '0 auto'
  }
}

RightPart.propTypes = {
  feedback: PropTypes.array,
  nickname: PropTypes.string
}

export default connect(
  ({ feedback, profile }) => ({
    feedback: feedback.closed,
    nickname: profile.nickname
  })
)(RightPart)
