import React, { Component } from 'react'
import { Modal, Form, Input, message, Button } from 'antd'
import { requestRegister, requestLogin } from '../../api/baseApi'
import './index.css'

const { Item } = Form

class Login extends Component {
  constructor (props) {
    super(props)
    this.form = React.createRef()
    this.state = {
      login: true,
      visible: false
    }
  }

  changeVisible = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  handleLogin = async () => {
    try {
      const values = await this.form.current.validateFields()
      const { ok, message: msg } = await requestLogin(values)
      if (ok) {
        this.changeVisible()
      } else {
        message.error(msg)
      }
    } catch (err) { }
  }

  handleRegister = async () => {
    try {
      const values = await this.form.current.validateFields()
      const { ok, message: msg } = await requestRegister(values)
      if (ok) {
        this.changeVisible()
      } else {
        message.error(msg)
      }
    } catch (err) { }
  }

  changeMode = () => {
    this.setState({
      login: !this.state.login
    })
  }

  render () {
    const { login, visible } = this.state
    return (
      <Modal
        title={login ? '登录' : '注册'}
        visible={visible}
        onCancel={this.changeVisible}
        footer={null}
      >
        <Form
          ref={this.form}
          labelCol={{ span: 2, offset: 3 }}
          wrapperCol={{ span: 14, offset: 1 }}
          onFinish={login ? this.handleLogin : this.handleRegister}
        >
          <Item
            label='邮箱'
            name='account_id'
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input />
          </Item>
          <Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Item>
          <Item wrapperCol={{ span: 17, offset: 3 }}>
            <Button
              type='primary'
              htmlType='submit'
              className='form-submit-btn'
            >
              {login ? '登录' : '注册'}
            </Button>
          </Item>
          <Item>
            {login ? '没有账号？去' : '已有账号？去'}
            <Button
              type='link'
              onClick={this.changeMode}
              className='no-padding'
            >
              {login ? '注册' : '登录'}
            </Button>
          </Item>
        </Form>
      </Modal>
    )
  }
}

export default Login
