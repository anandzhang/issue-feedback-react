import React, { Component } from 'react'
import { Modal, Form, Input, message, Button } from 'antd'
import PropTypes from 'prop-types'
import { requestRegister, requestLogin, requsetProfile } from '../../api/baseApi'
import Storage from '../../utils/Storage'
import './index.css'

const { Item } = Form

class Account extends Component {
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

  getProfile = async () => {
    try {
      const { ok, message: msg, result } = await requsetProfile()
      if (ok) {
        const { nickname } = result
        this.props.changeNickname(nickname)
      } else {
        message.error(msg)
      }
    } catch (err) { }
  }

  handleLogin = async (values) => {
    try {
      values = values || await this.form.current.validateFields()
      const data = await requestLogin(values)
      const { ok, message: msg, result } = data
      if (ok) {
        const { user_id: userId, token } = result
        Storage.saveMany({ userId, token })
        message.success('登录成功')
        this.getProfile()
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
        message.success('注册成功')
        this.handleLogin(values)
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
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' }
            ]}
          >
            <Input />
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

Account.propTypes = {
  changeNickname: PropTypes.func
}

export default Account
