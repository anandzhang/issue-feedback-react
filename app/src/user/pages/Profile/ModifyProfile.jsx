import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Form } from 'antd'
import ProfileForm from '../../components/ProfileForm'

const ModifyProfile = forwardRef(function Component (props, ref) {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  useImperativeHandle(ref, () => ({ changeVisible }))

  const changeVisible = () => setVisible(!visible)

  const updateProfile = async () => {
    const values = await form.validateFields()
    console.log(values)
  }

  return (
    <Modal
      title='修改资料'
      visible={true}
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
