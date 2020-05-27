import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, message } from 'antd'
import { requestCreateProduct } from '../../../api/base'

const { Item } = Form

class AddModal extends Component {
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

  addProduct = async () => {
    const { getProducts } = this.props
    const { validateFields, resetFields } = this.form.current
    try {
      const values = await validateFields()
      await requestCreateProduct(values)
      message.success('添加成功')
      getProducts()
      resetFields()
      this.changeVisible()
    } catch (err) {
      message.error(err)
    }
  }

  render () {
    const { visible } = this.state
    return (
      <Modal
        title='添加产品'
        visible={visible}
        onOk={this.addProduct}
        okText='确定'
        onCancel={this.changeVisible}
        cancelText='取消'
      >
        <Form
          ref={this.form}
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
}

AddModal.propTypes = {
  getProducts: PropTypes.func
}

export default AddModal
