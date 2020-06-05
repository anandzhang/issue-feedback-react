import React from 'react'
import { Form, Input, Button } from 'antd'

const { Item } = Form
const { TextArea } = Input

const CommentForm = () => {
  return (
    <Form>
      <Item style={{ marginBottom: 10 }}>
        <TextArea style={{ height: 70 }} />
      </Item>
      <Button type='primary'>评论</Button>
    </Form>
  )
}

export default CommentForm
