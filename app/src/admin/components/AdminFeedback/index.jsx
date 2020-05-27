import React, { Component } from 'react'
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

class Feedback extends Component {
  state = {
    products: [],
    feedback: []
  }

  getProducts = async () => {
    try {
      const { products } = await requestProductList()
      this.setState({ products }, () => this.getFeedback())
    } catch (err) {
      message.error(err)
    }
  }

  getFeedback = async () => {
    const { products } = this.state
    if (products.length !== 0) {
      try {
        const { issues } = await requestFeedbackList({
          // TODO: 暂取第一个产品进行反馈数据渲染
          product_id: products[0].product_id,
          status: 'opening'
        })
        this.setState({ feedback: issues })
      } catch (err) {
        message.error(err)
      }
    } else {
      message.error('没有任何产品')
    }
  }

  searchFeedback = values => {
    // TODO: 暂无后端接口
    message.success(JSON.stringify(values))
  }

  componentDidMount () {
    this.getProducts()
  }

  render () {
    const { products, feedback } = this.state
    return (
      <Card
        title={
          <div>
            反馈管理
            <Form
              onFinish={this.searchFeedback}
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
}

export default Feedback
