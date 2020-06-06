import React from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar } from 'antd'
import CommentForm from './CommentForm'

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

AddComment.propTypes = {
  id: PropTypes.string
}

export default AddComment
