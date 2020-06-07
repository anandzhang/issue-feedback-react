import React from 'react'
import PropTypes from 'prop-types'
import { Button, message, Form, Select } from 'antd'

const { Item } = Form
const { Option } = Select

const STATUS = {
  opening: '未解决',
  closed: '已解决'
}

const CardTitle = ({ products }) => {
  const searchFeedback = values => {
    // TODO: 暂无后端接口
    message.success(JSON.stringify(values))
  }

  return (
    <>
      反馈管理
      <Form
        onFinish={searchFeedback}
        style={{ display: 'inline-block', marginLeft: 20 }}
      >
        <Item name='product_id' noStyle>
          <Select placeholder='选择产品' style={{ width: 160 }}>
            {
              products.map(value => (
                <Option key={value.product_id} value={value.product_id}>{value.name}</Option>
              ))
            }
          </Select>
        </Item>
        <Item name='status' noStyle>
          <Select placeholder='选择产品状态' style={{ marginLeft: 5 }}>
            {
              Object.keys(STATUS).map(objKey => (
                <Option key={objKey} value={objKey}>{STATUS[objKey]}</Option>
              ))
            }
          </Select>
        </Item>
        <Button type='ghost' htmlType='submit' style={{ marginLeft: 5 }}>搜索</Button>
      </Form>
    </>
  )
}

CardTitle.propTypes = {
  products: PropTypes.array
}

export default CardTitle
