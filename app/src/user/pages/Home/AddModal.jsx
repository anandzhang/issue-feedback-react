import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Select, message } from 'antd'
import { requestCreateFeedback } from '../../../api/base'

const { Item } = Form
const { Option } = Select

const AddModal = (props, ref) => {
  const { products, getFeedback } = props
  const form = React.createRef()
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({ changeVisible }))

  const changeVisible = () => setVisible(!visible)

  const addFeedback = async () => {
    const { validateFields, resetFields } = form.current
    try {
      const values = await validateFields()
      await requestCreateFeedback(values)
      message.success('反馈成功')
      getFeedback(products[0].product_id)
      resetFields()
      changeVisible()
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <Modal
      title='用户反馈'
      visible={visible}
      onOk={addFeedback}
      okText='发布'
      onCancel={() => setVisible(!visible)}
      cancelText='取消'
    >
      <Form
        ref={form}
        labelCol={{ offset: 2 }}
        wrapperCol={{ span: 16 }}
      >
        <Item label='产品' name='product_id'>
          <Select>
            {
              products.map(value => {
                const { product_id: id, name } = value
                return <Option key={id} value={id}>{name}</Option>
              })
            }
          </Select>
        </Item>
        <Item label='标题' name='title'>
          <Input />
        </Item>
        <Item label='描述' name='description'>
          <Input.TextArea />
        </Item>
      </Form>
    </Modal>
  )
}

AddModal.propTypes = {
  products: PropTypes.array,
  getFeedback: PropTypes.func
}

export default forwardRef(AddModal)
