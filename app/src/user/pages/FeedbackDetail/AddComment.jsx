import React from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar } from 'antd'
import CommentForm from './CommentForm'
import { connect } from 'react-redux'

const { Meta } = Card

const AddComment = ({ id, profile }) => (
  <Meta
    avatar={(
      <Avatar
        size='large'
        shape='square'
        src={profile.avatar || '/images/avatar1.jpg'}
      />
    )}
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
  id: PropTypes.string,
  profile: PropTypes.object
}

export default connect(({ profile }) => ({ profile }))(AddComment)
