import React from 'react'
import { Card, Avatar } from 'antd'

const { Meta } = Card

const avatar = (
  <Avatar
    size='large'
    shape='square'
    src='/images/avatar.jpg'
  />
)

const AddComment = ({ id }) => (
  <Meta
    avatar={avatar}
    title={<CommentForm id={id} />}
    style={stylesheet.addComment}
  />
)

const stylesheet = {
  addComment: {
    marginTop: 20
  }
}

export default AddComment
