import React, { useState, useEffect } from 'react'
import { Col, Card, Avatar, message } from 'antd'
import Detail from './Detail'
import CommentForm from './CommentForm'
import MetaList from '../../../comon/MetaList'
import { requestFeedbackDetail, requestCommentList } from '../../../api/base'
import moment from '../../../utils/moment'

const CommentList = ({ id }) => {
  const [comments, setComments] = useState([])
  useEffect(() => {
    getCommentList()
  }, [])

  const getCommentList = async () => {
    try {
      const { comments } = await requestCommentList(id)
      setComments(comments)
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <Card
      title='评论'
      style={{ marginTop: 12 }}
      headStyle={{ border: 'none' }}
    >
      <MetaList
        dataSource={comments}
        titleIndex='content'
        descriptionRender={({ created_at: time, owner }) => (
          `${owner.nickname} 发表于 ${moment(time).fromNow()}`
        )}
      />

    </Card>
  )
}

export default CommentList
