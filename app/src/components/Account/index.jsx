import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'

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
      message.success(JSON.stringify(values))
      this.changeVisible()
    } catch (err) { }
  }

  handleRegister = async () => {
    try {
      const values = await this.form.current.validateFields()
      message.success(JSON.stringify(values))
      this.changeVisible()
    } catch (err) { }
  }

  render () {
    const { login, visible } = this.state
    return (
      <Modal
        title={login ? '登录' : '注册'}
        visible={visible}
        onOk={login ? this.handleLogin : this.handleRegister}
        onCancel={this.changeVisible}
        okText='确认'
        cancelText='取消'
      >
        <Form
          ref={this.form}
          labelCol={{ span: 2, offset: 3 }}
          wrapperCol={{ span: 14, offset: 1 }}
        >
          <Item
            label='邮箱'
            name='email'
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
        </Form>
      </Modal>
    )
  }
}

export default Login
