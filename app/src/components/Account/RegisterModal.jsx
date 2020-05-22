import React, { Component } from 'react'
import { Modal, Form, Input, InputNumber, Button, Row, Col, message } from 'antd'
import { requestSendCode, requestRegister } from '../../api/baseApi'

const { Item } = Form

class RegisterModal extends Component {
  constructor(props) {
    super(props)
    this.form = React.createRef()
    this.state = {
      visible: false
    }
  }

  changeVisible = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  showLoginModal = () => {
    const { showLoginModal } = this.props
    this.changeVisible()
    showLoginModal()
  }

  sendMailCode = async () => {
    const value = await this.form.current.validateFields(['account_id'])
    console.log(value)
    const { ok, message: msg, result } = await requestSendCode(value)
    if (ok) {
      this.form.current.setFieldsValue(result)
    } else {
      message.error(msg)
    }
  }

  handleRegister = async () => {
    try {
      const values = await this.form.current.validateFields()
      console.log(values)
      const { ok, message: msg } = await requestRegister(values)
      if (ok) {
        message.success('注册成功')
        this.handleLogin(values)
      } else {
        message.error(msg)
      }
    } catch (err) { }
  }

  render() {
    const { visible } = this.state
    return (
      <Modal
        title='注册'
        visible={visible}
        onCancel={this.changeVisible}
        footer={null}
      >
        <Form
          ref={this.form}
          labelCol={{ span: 3, offset: 2 }}
          wrapperCol={{ span: 14, offset: 1 }}
          onFinish={this.handleRegister}
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
            <Col offset={2}><Button onClick={this.sendMailCode}>点击获取</Button></Col>
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
              onClick={this.showLoginModal}
              className='no-padding'
            >
              登录
            </Button>
          </Item>
        </Form>
      </Modal>
    )
  }
}

export default RegisterModal