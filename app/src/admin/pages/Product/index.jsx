import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts } from '../../../actions'
import { Card, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import EditableTable from '../../components/EditableTable'
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

  const newColumns = columns.map(col => {
    if (!col.editable) return col
    return {
      ...col,
      onCell: record => {
        return {
          record,
          ...col
        }
      }
    }
  })

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
      <EditableTable
        dataSource={products}
        columns={newColumns}
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
