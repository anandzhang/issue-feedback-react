import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Form, Input, Row, Col, InputNumber, Button, message, Select } from 'antd'
import { testSendCode, testRegister } from '../../../api/base'

const { Item, useForm } = Form
const { Option } = Select

const AddModal = forwardRef(function Component (props, ref) {
  const [form] = useForm()
  const [visible, setVisible] = useState(false)
  useImperativeHandle(ref, () => ({ changeVisible }))

  const changeVisible = () => setVisible(!visible)

  const sendMailCode = async () => {
    try {
      const value = await form.validateFields(['account_id'])
      // TODO: 使用了测试API
      const data = await testSendCode(value)
      const { result } = data
      form.setFieldsValue(result)
    } catch { }
  }

  const handleRegister = async valules => {
    try {
      const { ok } = await testRegister(valules)
      if (ok) message.success('添加成功')
      changeVisible()
    } catch (err) {
      message.error('' + err)
    }
  }

  return (
    <Modal
      title='添加成员'
      visible={visible}
      footer={null}
      onCancel={changeVisible}
    >
      <Form
        form={form}
        labelCol={{ span: 3, offset: 2 }}
        wrapperCol={{ span: 14, offset: 1 }}
        initialValues={{ role_id: 'USER' }}
        onFinish={handleRegister}
      >
        <Item
          label='邮箱'
          name='account_id'
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入正确的邮箱格式' }
          ]}
        >
          <Input />
        </Item>
        <Row>
          <Col offset={1}>
            <Item
              label='验证码'
              labelCol={{ span: 10, offset: 3 }}
              wrapperCol={{ span: 9, offset: 2 }}
              name='validate_code'
              rules={[{ required: true, message: '请输入邮箱验证码' }]}
            >
              <InputNumber />
            </Item>
          </Col>
          <Col offset={2}><Button onClick={sendMailCode}>点击获取</Button></Col>
        </Row>
        <Item name='validate_token' noStyle >
          <Input type='hidden' />
        </Item>
        <Item label='身份' name='role_id'>
          <Select>
            <Option value='USER'>用户</Option>
            <Option value='MANAGER'>管理员</Option>
            <Option value='DEVELOPER'>开发人员</Option>
          </Select>
        </Item>
        <Item
          label='密码'
          name='password'
          rules={[
            { required: true, message: '请输入密码' },
            { min: 8, message: '必须大于8位' },
            { max: 16, message: '不能超多16位' },
            { pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[.~!@&%#_])[a-zA-Z0-9.~!@&%#_]*$/, message: '必须包含字母、符号.~!@&%#_、数字' }
          ]}
        >
          <Input.Password />
        </Item>
        <Item wrapperCol={{ span: 17, offset: 3 }}>
          <Button
            type='primary'
            htmlType='submit'
            className='form-submit-btn'
          >
            注册
          </Button>
        </Item>
      </Form>
    </Modal>
  )
})

export default AddModal
