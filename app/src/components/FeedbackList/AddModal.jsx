import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Select, message } from 'antd'
import { requestCreateFeedback } from '../../api/base'

const { Item } = Form
const { Option } = Select

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

  addFeedback = async () => {
    const { getFeedback } = this.props
    const { validateFields, resetFields } = this.form.current
    try {
      const values = await validateFields()
      await requestCreateFeedback(values)
      message.success('反馈成功')
      getFeedback()
      resetFields()
      this.changeVisible()
    } catch (err) {
      message.error(err)
    }
  }

  render () {
    const { visible } = this.state
    const { products } = this.props
    return (
      <Modal
        title='用户反馈'
        visible={visible}
        onOk={this.addFeedback}
        okText='发布'
        onCancel={this.changeVisible}
        cancelText='取消'
      >
        <Form
          ref={this.form}
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
}

AddModal.propTypes = {
  products: PropTypes.array,
  getFeedback: PropTypes.func
}

export default AddModal
