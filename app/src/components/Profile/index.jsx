import React, { Component } from 'react'
import { Modal, Form, Input, Radio, Upload, Button, message } from 'antd'
import { requestUpdateProfile } from '../../api/baseApi'

const { Item } = Form

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    this.form = React.createRef()
  }

  changeVisible = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  createProfile = async () => {
    try {
      const values = await this.form.current.validateFields()
      const { ok, message: msg } = await requestUpdateProfile(values)
      if (ok) {
        message.success('资料创建成功')
        this.changeVisible()
      } else {
        message.error(msg)
      }
    } catch (err) { }
  }

  render () {
    const { visible } = this.state
    return (
      <Modal
        title='修改资料'
        visible={visible}
        onOk={this.createProfile}
        onCancel={this.changeVisible}
        okText='确认'
        cancelText='取消'
      >
        <Form
          ref={this.form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12, offset: 1 }}
        >
          <Item
            name='nickname'
            label='昵称'
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input />
          </Item>
          <Item name='gender' label='性别'>
            <Radio.Group>
              <Radio value='0'>男</Radio>
              <Radio value='1'>女</Radio>
            </Radio.Group>
          </Item>
          <Item name='avatar' label='头像' valuePropName='fileList'>
            <Upload>
              <Button>点击上传</Button>
            </Upload>
          </Item>
        </Form>
      </Modal>
    )
  }
}

export default Profile
