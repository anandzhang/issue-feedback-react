import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { List, Avatar, message } from 'antd'
import { requestCommentList } from '../../../api/base'

const { Item } = List
const { Meta } = Item

const CommentList = ({ id }) => {
  const [comments, setComments] = useState([])
  useEffect(() => {
    if (id) getCommentList(id)
  }, [id])

  const getCommentList = async id => {
    try {
      const { comments } = await requestCommentList(id)
      setComments(comments)
    } catch (err) {
      message.error(err)
    }
  }

  const renderItem = item => {
    const { content, created_at: createTime, owner } = item
    const { nickname } = owner
    return (
      <Item>
        <Meta
          avatar={
            <Avatar
              size='large'
              shape='square'
              src='/images/avatar.jpg'
            />
          }
          title={content}
          description={`${nickname} 发表于 ${createTime}`}
        />
      </Item>
    )
  }
  return (
    <List
      dataSource={comments}
      renderItem={renderItem}
    />
  )
}

CommentList.propTypes = {
  id: PropTypes.string
}

export default CommentList
