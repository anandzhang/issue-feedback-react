import React from 'react'
import { Col, Card, Avatar } from 'antd'
import Detail from './Detail'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

const LeftPart = ({ id }) => {
  return (
    <Col span={18}>
      <Detail id={id} />
      <Card
        title='评论'
        style={{ marginTop: 12 }}
        headStyle={{ border: 'none' }}
      >
        <CommentList id={id} />
        <Card.Meta
          avatar={
            <Avatar
              size='large'
              shape='square'
              src='/images/avatar.jpg'
            />
          }
          title={<CommentForm id={id} />}
          style={{ marginTop: 20 }}
        />
      </Card>
    </Col>
  )
}

export default LeftPart
