import React from 'react'
import { useParams } from 'react-router-dom'
import { Col, Card, Avatar } from 'antd'
import Detail from './Detail'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import AddComment from './AddComment'

const LeftPart = () => {
  const { id } = useParams()

  return (
    <Col span={18}>
      <Detail id={id} />
      <CommentList id={id} />
      <AddComment id={id} />
    </Col>
  )
}

export default LeftPart
