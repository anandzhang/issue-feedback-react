import React, { Component } from 'react'
import { Modal, Form, Input, Radio, Upload, Button, message } from 'antd'
import { requestUpdateProfile } from '../../../api/base'

const { Item, useForm } = Form

const ProfileForm = ({ form }) => {
  return (
    <Form
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 12, offset: 1 }}
    >
      <Item
        name='nickname'
        label='昵称'
        rules={[{ required: true, message: '请输入昵称' }]}
      >
        <Input />
      </Item>
      <Item name='gender' label='性别'>
        <Radio.Group>
          <Radio value='0'>男</Radio>
          <Radio value='1'>女</Radio>
        </Radio.Group>
      </Item>
      <Item name='avatar' label='头像' valuePropName='fileList'>
        <Upload>
          <Button>点击上传</Button>
        </Upload>
      </Item>
    </Form>
  )
}

export default ProfileForm
