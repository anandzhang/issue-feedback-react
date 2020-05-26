import React, { Component } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { requestProductList } from '../../api/base'

const { Item } = Form
const { Option } = Select

class AddModal extends Component {
  constructor (props) {
    super(props)
    this.form = React.createRef()
    this.state = {
      visible: true,
      products: []
    }
  }

  changeVisible = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  addFeedback = async () => {
    // const values = await this.form.current.validateFields()
    // console.log(values)
  }

  getProducts = async () => {
    try {
      const { products } = await requestProductList()
      this.setState({ products })
    } catch (err) {
      message.error(err)
    }
  }

  componentDidMount () {
    this.getProducts()
  }

  render () {
    const { visible, products } = this.state
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

export default AddModal
