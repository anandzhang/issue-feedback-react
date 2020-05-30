import React, { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, InputNumber, Button, Row, Col, message } from 'antd'
import { testSendCode, requestRegister } from '../../../api/base'

const { Item } = Form

const RegisterModal = (props, ref) => {
  const form = React.createRef()
  const [visible, setVisible] = useState(false)
  useImperativeHandle(ref, () => ({ changeVisible }))

  const changeVisible = () => setVisible(!visible)

  const showLoginModal = () => {
    this.changeVisible()
    props.showLoginModal()
  }

  const sendMailCode = async () => {
    try {
      const value = await form.current.validateFields(['account_id'])
      // TODO: 使用了测试API
      const data = await testSendCode(value)
      const { result } = data
      this.form.current.setFieldsValue(result)
    } catch (err) {
      message.error(err)
    }
  }

  const handleRegister = async () => {
    try {
      const values = await form.current.validateFields()
      await requestRegister(values)
      message.success('注册成功')
      this.changeVisible()
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <Modal
      title='注册'
      visible={visible}
      onCancel={changeVisible}
      footer={null}
    >
      <Form
        ref={form}
        labelCol={{ span: 3, offset: 2 }}
        wrapperCol={{ span: 14, offset: 1 }}
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
        <Item>
          已有账号？去
          <Button
            type='link'
            onClick={showLoginModal}
            className='no-padding'
          >
            登录
          </Button>
        </Item>
      </Form>
    </Modal>
  )
}

RegisterModal.propTypes = {
  showLoginModal: PropTypes.func
}

export default forwardRef(RegisterModal)
