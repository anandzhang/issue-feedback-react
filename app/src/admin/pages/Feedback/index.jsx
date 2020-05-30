import React, { useState, useEffect } from 'react'
import { Card, Button, message, Table, Form, Select } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { requestProductList, requestFeedbackList } from '../../../api/base'

const { Item } = Form
const { Option } = Select

const STATUS = {
  opening: '未解决',
  closed: '已解决'
}

const columns = [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: status => STATUS[status]
  },
  {
    title: '描述',
    dataIndex: 'description'
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    render: date => moment(date).locale('zh-cn').fromNow()
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    render: date => moment(date).locale('zh-cn').format('lll')
  },
  {
    title: '创建人',
    dataIndex: 'owner_id'
  }
]

const Feedback = () => {
  const [products, setProducts] = useState([])
  const [feedback, setFeedback] = useState([])
  useEffect(() => {
    getProducts()
  }, [])
  useEffect(() => {
    if (products.length !== 0) getFeedback()
  }, [products])

  const getProducts = async () => {
    try {
      const { products } = await requestProductList()
      setProducts(products)
    } catch (err) {
      message.error(err)
    }
  }

  const getFeedback = async () => {
    try {
      const { issues } = await requestFeedbackList({
        // TODO: 暂取第一个产品进行反馈数据渲染
        product_id: products[0].product_id,
        status: 'opening'
      })
      setFeedback(issues)
    } catch (err) {
      message.error(err)
    }
  }

  const searchFeedback = values => {
    // TODO: 暂无后端接口
    message.success(JSON.stringify(values))
  }

  return (
    <Card
      title={
        <div>
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
        </div>
      }
    >
      <Table
        dataSource={feedback}
        columns={columns}
        rowKey='issue_id'
      />
    </Card>
  )
}

export default Feedback
