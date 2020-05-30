import React, { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, message } from 'antd'
import { requestCreateProduct } from '../../../api/base'

const { Item } = Form

const AddModal = (props, ref) => {
  const form = React.createRef()
  const [visible, setVisible] = useState(false)
  useImperativeHandle(ref, () => ({ changeVisible }))

  const changeVisible = () => setVisible(!visible)

  const addProduct = async () => {
    const { getProducts } = props
    const { validateFields, resetFields } = form.current
    try {
      const values = await validateFields()
      await requestCreateProduct(values)
      message.success('添加成功')
      getProducts()
      resetFields()
      changeVisible()
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <Modal
      title='添加产品'
      visible={visible}
      onOk={addProduct}
      okText='确定'
      onCancel={changeVisible}
      cancelText='取消'
    >
      <Form
        ref={form}
        labelCol={{ offset: 4 }}
        wrapperCol={{ span: 12 }}
      >
        <Item
          label='名称'
          name='name'
          rules={[{ required: true, message: '请输入产品名称' }]}
        >
          <Input />
        </Item>
        <Item
          label='描述'
          name='description'
          rules={[{ required: true, message: '请输入产品描述' }]}
        >
          <Input.TextArea />
        </Item>
      </Form>
    </Modal>
  )
}

AddModal.propTypes = {
  getProducts: PropTypes.func
}

export default forwardRef(AddModal)
