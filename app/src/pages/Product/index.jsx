import React, { Component } from 'react'
import { Card, Button, message, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { requestProductList } from '../../api/base'

const columns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '描述',
    dataIndex: 'description'
  },
  {
    title: '创建时间',
    dataIndex: 'created_at'
  },
  {
    title: '创建人',
    dataIndex: 'manager_id'
  }
]

class Product extends Component {
  state = {
    products: []
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
    const { products } = this.state
    return (
      <Card
        title='产品管理'
        extra={<Button type='primary' icon={<PlusOutlined />}>添加产品</Button>}
      >
        <Table
          dataSource={products}
          columns={columns}
          rowKey='product_id'
        />
      </Card>
    )
  }
}

export default Product
