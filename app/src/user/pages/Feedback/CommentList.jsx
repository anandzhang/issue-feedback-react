import React from 'react'
import PropTypes from 'prop-types'
import { List, Avatar } from 'antd'

const { Item } = List
const { Meta } = Item

const CommentList = ({ comments }) => {
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
  comments: PropTypes.array
}

export default CommentList
