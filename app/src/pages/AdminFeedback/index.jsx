import React, { Component } from 'react'
import { Card, Button, message, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { requestProductList, requestFeedbackList } from '../../api/base'

const columns = [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '状态',
    dataIndex: 'status'
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

  showAddModal = () => {

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

  componentDidMount () {
    this.getProducts()
  }

  render () {
    const { feedback } = this.state
    return (
      <Card
        title='反馈管理'
        extra={
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={this.showAddModal}
          >
            添加反馈
          </Button>
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
