import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts, getFeedback } from '../../../actions'
import { Button, Form, Select } from 'antd'
import STATUS from '../../../constants/Status'

const { Item, useForm } = Form
const { Option } = Select

const CardTitle = ({ products, status, getFeedback, setStatus, getProducts }) => {
  const [form] = useForm()
  useEffect(() => {
    if (!products.length) getProducts()
    else {
      const firstProductId = products[0].product_id
      form.setFieldsValue({ id: firstProductId, status })
      form.submit()
    }
  }, [products])

  const searchFeedback = values => {
    const { id, status } = values
    setStatus(status)
    getFeedback(id, status)
  }

  return (
    <>
      反馈管理
      <Form
        form={form}
        onFinish={searchFeedback}
        style={{ display: 'inline-block', marginLeft: 20 }}
      >
        <Item name='id' noStyle>
          <Select placeholder='选择产品' style={{ width: 160 }}>
            {products.map(value => (
              <Option key={value.product_id} value={value.product_id}>{value.name}</Option>
            ))}
          </Select>
        </Item>
        <Item name='status' noStyle>
          <Select placeholder='选择产品状态' style={{ marginLeft: 5 }}>
            <Option value={STATUS.OPENING}>{STATUS.opening}</Option>
            <Option value={STATUS.CLOSED}>{STATUS.closed}</Option>
          </Select>
        </Item>
        <Button type='ghost' htmlType='submit' style={{ marginLeft: 5 }}>搜索</Button>
      </Form>
    </>
  )
}

CardTitle.propTypes = {
  products: PropTypes.array,
  getProducts: PropTypes.func,
  getFeedback: PropTypes.func,
  status: PropTypes.string,
  setStatus: PropTypes.func
}

export default connect(
  ({ products }) => ({ products }),
  { getProducts, getFeedback }
)(CardTitle)
