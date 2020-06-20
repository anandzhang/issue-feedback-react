import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Form, message } from 'antd'
import ProfileForm from '../../components/ProfileForm'
import { requestUpdateProfile } from '../../../api/base'

const ModifyProfile = forwardRef(function Component (props, ref) {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  useImperativeHandle(ref, () => ({ changeVisible }))

  const changeVisible = () => setVisible(!visible)

  const updateProfile = async () => {
    try {
      const values = await form.validateFields()
      await requestUpdateProfile(values)
      changeVisible()
    } catch { message.error('修改失败') }
  }

  return (
    <Modal
      title='修改资料'
      visible={visible}
      onOk={updateProfile}
      onCancel={changeVisible}
      okText='确认'
      cancelText='取消'
    >
      <ProfileForm form={form} />
    </Modal>
  )
})

export default ModifyProfile
