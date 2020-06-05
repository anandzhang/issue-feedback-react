import React from 'react'
import { Card, List, Avatar, Form, Input, Button } from 'antd'

const { Item } = List
const { Meta } = Item

const dataSource = [
  {
    name: 'dadasd',
    content: 'dads'
  },
  {
    name: 'dadasd',
    content: 'dads'
  },
  {
    name: 'dadasd',
    content: 'dads'
  },
]

const CommentList = () => {

  const renderItem = ({ content }) => (
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
        description='dsasd'
      />
    </Item>
  )
  return (
    <List
      dataSource={dataSource}
      renderItem={renderItem}
    />
  )
}

export default CommentList
