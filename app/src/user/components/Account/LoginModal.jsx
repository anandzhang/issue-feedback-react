import React, { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfile } from '../../../actions'
import { Modal, Form, Input, Button, message } from 'antd'
import { requestLogin } from '../../../api/base'
import Storage from '../../../utils/Storage'

const { Item } = Form

const LoginModal = forwardRef(function Component (props, ref) {
  const form = React.createRef()
  const [visible, setVisible] = useState(false)
  useImperativeHandle(ref, () => ({ changeVisible }))

  const changeVisible = () => setVisible(!visible)

  const showRegisterModal = () => {
    changeVisible()
    props.showRegisterModal()
  }

  const handleLogin = async () => {
    try {
      const values = await form.current.validateFields()
      const result = await requestLogin(values)
      const { user_id: userId, token } = result
      Storage.saveMany({ userId, token })
      message.success('登录成功')
      props.getProfile(userId)
      changeVisible()
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <Modal
      title='登录'
      visible={visible}
      onCancel={changeVisible}
      footer={null}
    >
      <Form
        ref={form}
        labelCol={{ span: 2, offset: 3 }}
        wrapperCol={{ span: 14, offset: 1 }}
        onFinish={handleLogin}
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
            onClick={showRegisterModal}
            className='no-padding'
          >
            注册
          </Button>
        </Item>
      </Form>
    </Modal>
  )
})

LoginModal.propTypes = {
  showRegisterModal: PropTypes.func,
  getProfile: PropTypes.func
}

export default connect(
  null,
  { getProfile },
  null,
  { forwardRef: true }
)(LoginModal)
