import React from 'react'
import { useParams } from 'react-router-dom'
import { Col } from 'antd'
import Detail from './Detail'
import CommentList from './CommentList'

const LeftPart = () => {
  const { id } = useParams()

  return (
    <Col span={18}>
      <Detail id={id} />
      <CommentList id={id} />
    </Col>
  )
}

export default LeftPart
