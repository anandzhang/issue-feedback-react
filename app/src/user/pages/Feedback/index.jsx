import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Avatar, List, message } from 'antd'
import {
  LikeOutlined,
  MessageOutlined,
  EllipsisOutlined
} from '@ant-design/icons'
import Detail from './Detail'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { requestFeedbackDetail } from '../../../api/base'

const Feedback = props => {
  const { match, history } = props
  const [detail, setDetail] = useState({})
  useEffect(() => {
    if (!match) history.push('/')
    else {
      const { id } = match.params
      getFeedbackDetail(id)
    }
  }, [])

  const getFeedbackDetail = async id => {
    try {
      const result = await requestFeedbackDetail(id)
      setDetail(result)
      console.log(result)
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <Row gutter={12} style={{ marginTop: 20 }}>
      <Col span={18}>
        <Detail data={detail} />
        <Card
          title='评论'
          style={{ marginTop: 12 }}
          headStyle={{ border: 'none' }}
        >
          <CommentList />
          <Card.Meta
            avatar={
              <Avatar
                size='large'
                shape='square'
                src='/images/avatar.jpg'
              />
            }
            title={<CommentForm />}
            style={{ marginTop: 20 }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card title='其他反馈'>
          <List
            dataSource={[
              { content: 'dasds' },
              { content: 'dasds' },
              { content: 'dasds' },
              { content: 'dasds' },
              { content: 'dasds' }
            ]}
            renderItem={item => <List.Item>{item.content}</List.Item>}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default Feedback
