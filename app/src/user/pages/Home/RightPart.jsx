import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Card, Button, message } from 'antd'
import CenterStatistic from '../../../comon/CenterStatistic'
import SimpleList from '../../../comon/SimpleList'
import AddModal from './AddModal'
import {
  requestUserStatistic,
  requestManagerStatistic,
  requestDeveloperStatistic
} from '../../../api/base'
import Storage from '../../../utils/Storage'

const RightPart = props => {
  const { feedback, nickname, roleId } = props
  const addModal = React.useRef(null)
  const [statistic, setStatistic] = useState([])
  useEffect(() => {
    getStatistic()
  }, [roleId])

  const getStatistic = async () => {
    let result = ''
    switch (roleId) {
      case 'USER':
        result = await requestUserStatistic()
        setStatistic([
          {
            title: '已解决',
            value: result.solved_count
          },
          {
            title: '提出反馈',
            value: result.total_count
          }
        ])
        break
      case 'MANAGER':
        result = await requestManagerStatistic()
        setStatistic([
          {
            title: '受理反馈',
            value: result.accepted_count
          },
          {
            title: '解决反馈',
            value: result.closed_count
          },
          {
            title: '今日反馈',
            value: result.total_count
          }
        ])
        break
      case 'DEVELOPER':
        result = await requestDeveloperStatistic()
        setStatistic([
          {
            title: '正在处理',
            value: result.opening_count
          },
          {
            title: '已经解决',
            value: result.closed_count
          }
        ])
        break
    }
  }

  const addFeedback = () => {
    const userId = Storage.get('userId')
    if (userId) addModal.current.changeVisible()
    else message.error('请先登录')
  }

  return (
    <Col span={6}>
      <Card style={stylesheet.marginX10}>
        {nickname
          ? (
            <CenterStatistic
              dataSource={statistic}
              style={stylesheet.marginBottom20}
            />
          )
          : ''}
        <Button
          type='primary'
          onClick={addFeedback}
          style={stylesheet.feedbackBtn}
        >
          反馈一下
        </Button>
      </Card>
      <Card title='最新动态'>
        <SimpleList dataSource={feedback} itemName='title' linkIndex='issue_id' />
      </Card>
      <AddModal ref={addModal} getStatistic={getStatistic} />
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
  nickname: PropTypes.string,
  roleId: PropTypes.string
}

export default connect(
  ({ feedback, profile }) => ({
    feedback: feedback.closed,
    nickname: profile.nickname,
    roleId: profile.roleId
  })
)(RightPart)
