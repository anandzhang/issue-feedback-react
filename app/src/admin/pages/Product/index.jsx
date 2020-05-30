import React, { useState, useEffect } from 'react'
import { Card, Button, message, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { requestProductList } from '../../../api/base'
import AddModal from './AddModal'

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
    dataIndex: 'created_at',
    render: date => moment(date).locale('zh-cn').fromNow()
  },
  {
    title: '创建人',
    dataIndex: 'manager_id'
  }
]

const Product = () => {
  const addModal = React.useRef(null)
  const [products, setProducts] = useState([])
  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const { products } = await requestProductList()
      setProducts(products)
    } catch (err) {
      message.error(err)
    }
  }

  const showAddModal = () => {
    addModal.current.changeVisible()
  }

  return (
    <Card
      title='产品管理'
      extra={
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={showAddModal}
        >
          添加产品
        </Button>
      }
    >
      <Table
        dataSource={products}
        columns={columns}
        rowKey='product_id'
      />
      <AddModal ref={addModal} getProducts={getProducts} />
    </Card>
  )
}

export default Product
