import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts } from '../../../actions'
import { Card, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddModal from './AddModal'
import columns from './columns'

const Product = props => {
  const { products, getProducts } = props
  const addModal = React.useRef(null)
  useEffect(() => {
    getProducts()
  }, [])

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

Product.propTypes = {
  products: PropTypes.array,
  getProducts: PropTypes.func
}

export default connect(
  ({ products }) => ({ products }),
  { getProducts }
)(Product)
