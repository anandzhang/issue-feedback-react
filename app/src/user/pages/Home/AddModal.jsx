import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFeedback } from '../../../actions'
import { Modal, Form, Input, Select, message } from 'antd'
import { requestCreateFeedback } from '../../../api/base'

const { Item } = Form
const { Option } = Select

const AddModal = forwardRef(function Component (props, ref) {
  const { products, getFeedback, getStatistic } = props
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
      getFeedback(products[0].product_id, 'opening')
      resetFields()
      getStatistic()
      changeVisible()
    } catch { }
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
        <Item label='产品' name='product_id'
          rules={[{ required: true, message: '请选择产品' }]}
        >
          <Select>
            {
              products.map(value => {
                const { product_id: id, name } = value
                return <Option key={id} value={id}>{name}</Option>
              })
            }
          </Select>
        </Item>
        <Item label='标题' name='title'
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input />
        </Item>
        <Item label='描述' name='description'
          rules={[{ required: true, message: '请输入描述' }]}>
          <Input.TextArea />
        </Item>
      </Form>
    </Modal>
  )
})

AddModal.propTypes = {
  products: PropTypes.array,
  getFeedback: PropTypes.func,
  getStatistic: PropTypes.func
}

export default connect(
  ({ products }) => ({ products }),
  { getFeedback },
  null,
  { forwardRef: true }
)(AddModal)
