import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getComments } from '../../../actions'
import { Form, Input, Button, message } from 'antd'
import { requestCreateComment } from '../../../api/base'

const { Item } = Form
const { TextArea } = Input

const CommentForm = ({ id, getComments }) => {
  const form = React.createRef()

  const postComment = async ({ content }) => {
    try {
      await requestCreateComment({
        issue_id: id,
        content
      })
      getComments(id)
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
        style={stylesheet.formItem}
      >
        <TextArea
          placeholder='来说几句吧......'
          style={stylesheet.textArea}
        />
      </Item>
      <Button type='primary' htmlType='submit'>评论</Button>
    </Form>
  )
}

const stylesheet = {
  formItem: {
    marginBottom: 10
  },
  textArea: {
    height: 70
  }
}

CommentForm.propTypes = {
  id: PropTypes.string,
  getComments: PropTypes.func
}

export default connect(
  null,
  { getComments }
)(CommentForm)
