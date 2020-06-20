import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Input, Radio } from 'antd'
import AvatarSelect from '../AvatarSelect'

const { Item } = Form

const ProfileForm = ({ form, profile }) => {
  const { nickname, gender, avatar } = profile
  return (
    <Form
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 12, offset: 1 }}
      initialValues={{
        nickname,
        gender,
        avatar
      }}
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
          <Radio value={0}>男</Radio>
          <Radio value={1}>女</Radio>
        </Radio.Group>
      </Item>
      <Item name='avatar' label='头像'>
        <AvatarSelect
          size='large'
          options={[
            '/images/avatar1.jpg',
            '/images/avatar2.jpg',
            '/images/avatar3.jpg',
            '/images/avatar4.jpg'
          ]}
        />
      </Item>
    </Form>
  )
}

ProfileForm.propTypes = {
  form: PropTypes.object,
  profile: PropTypes.object
}

export default connect(({ profile }) => ({ profile }))(ProfileForm)
