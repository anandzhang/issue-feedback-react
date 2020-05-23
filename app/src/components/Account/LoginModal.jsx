import React, { Component } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import PropTypes from 'prop-types'
import { requestLogin, requsetProfile } from '../../api/baseApi'
import Storage from '../../utils/Storage'

const { Item } = Form

class LoginModal extends Component {
  constructor (props) {
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

  showRegisterModal = () => {
    const { showRegisterModal } = this.props
    this.changeVisible()
    showRegisterModal()
  }

  handleLogin = async () => {
    try {
      const values = await this.form.current.validateFields()
      const data = await requestLogin(values)
      const { ok, message: msg, result } = data
      if (ok) {
        const { user_id: userId, role_id: roleId, token } = result
        Storage.saveMany({ userId, roleId, token })
        message.success('登录成功')
        this.getProfile()
        this.changeVisible()
      } else {
        message.error(msg)
      }
    } catch (err) { }
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

  render () {
    const { visible } = this.state
    return (
      <Modal
        title='登录'
        visible={visible}
        onCancel={this.changeVisible}
        footer={null}
      >
        <Form
          ref={this.form}
          labelCol={{ span: 2, offset: 3 }}
          wrapperCol={{ span: 14, offset: 1 }}
          onFinish={this.handleLogin}
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
              登录
            </Button>
          </Item>
          <Item>
            没有账号？去
            <Button
              type='link'
              onClick={this.showRegisterModal}
              className='no-padding'
            >
              注册
            </Button>
          </Item>
        </Form>
      </Modal>
    )
  }
}

LoginModal.propTypes = {
  showRegisterModal: PropTypes.func,
  changeNickname: PropTypes.func
}

export default LoginModal
