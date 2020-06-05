import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, message } from 'antd'
import { requestCreateComment } from '../../../api/base'

const { Item } = Form
const { TextArea } = Input

const CommentForm = ({ id, getCommentList }) => {
  const form = React.createRef()

  const postComment = async ({ content }) => {
    try {
      await requestCreateComment({
        issue_id: id,
        content
      })
      getCommentList(id)
      form.current.resetFields()
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <Form ref={form} onFinish={postComment}>
      <Item
        name='content'
        rules={[{ required: true, message: '请输入内容' }]}
        style={{ marginBottom: 10 }}
      >
        <TextArea
          placeholder='来说几句吧......'
          style={{ height: 70 }}
        />
      </Item>
      <Button type='primary' htmlType='submit'>评论</Button>
    </Form>
  )
}

CommentForm.propTypes = {
  id: PropTypes.string,
  getCommentList: PropTypes.func
}

export default CommentForm
