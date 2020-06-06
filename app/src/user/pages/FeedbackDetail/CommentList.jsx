import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getComments } from '../../../actions'
import { Card } from 'antd'
import chinaDate from '../../../utils/chinaDate'
import MetaList from '../../../comon/MetaList'
import AddComment from './AddComment'

const CommentList = props => {
  const { id, comments, getComments } = props
  useEffect(() => {
    getComments(id)
  }, [])

  return (
    <Card
      title='评论'
      style={stylesheet.commentList}
      headStyle={stylesheet.commentListTitle}
    >
      <MetaList
        dataSource={comments}
        titleIndex='content'
        descriptionRender={({ created_at: time, owner }) => (
          `${owner.nickname} 发表于 ${chinaDate(time).fromNow()}`
        )}
      />
      <AddComment id={id} />
    </Card>
  )
}

const stylesheet = {
  commentList: {
    marginTop: 12
  },
  commentListTitle: {
    border: 'none'
  }
}

CommentList.propTypes = {
  id: PropTypes.string,
  comments: PropTypes.array,
  getComments: PropTypes.func
}

export default connect(
  ({ comments }) => ({ comments }),
  { getComments }
)(CommentList)
