import React, { Component } from 'react'
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

class Product extends Component {
  constructor (props) {
    super(props)
    this.addModal = React.createRef()
    this.state = {
      products: []
    }
  }

  getProducts = async () => {
    try {
      const { products } = await requestProductList()
      this.setState({ products })
    } catch (err) {
      message.error(err)
    }
  }

  showAddModal = () => this.addModal.current.changeVisible()

  componentDidMount () {
    this.getProducts()
  }

  render () {
    const { products } = this.state
    return (
      <Card
        title='产品管理'
        extra={
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={this.showAddModal}
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
        <AddModal ref={this.addModal} getProducts={this.getProducts} />
      </Card>
    )
  }
}

export default Product
