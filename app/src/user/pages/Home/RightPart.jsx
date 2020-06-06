import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Card, Button } from 'antd'
import UserStatistic from '../../components/UserStatistic'
import SimpleList from '../../../comon/SimpleList'
import AddModal from './AddModal'

const RightPart = props => {
  const { feedback, nickname } = props
  const addModal = React.useRef(null)

  return (
    <Col span={6}>
      <Card style={stylesheet.marginX10}>
        {nickname
          ? (
            <UserStatistic
              like={10}
              feedback={20}
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
  nickname: PropTypes.array
}

export default connect(
  ({ feedback, profile }) => ({
    feedback: feedback.closed,
    nickname: profile.nickname
  })
)(RightPart)
