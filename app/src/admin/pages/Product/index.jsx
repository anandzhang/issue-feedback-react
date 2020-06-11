import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts, saveProducts } from '../../../actions'
import { Card, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import EditableTable from '../../components/EditableTable'
import AddModal from './AddModal'
import columns from './columns'
import { requestUpdateProduct, requestDeleteProduct } from '../../../api/base'

const Product = props => {
  const { products, getProducts, saveProducts } = props
  const addModal = React.useRef(null)
  useEffect(() => {
    getProducts()
  }, [])

  const showAddModal = () => {
    addModal.current.changeVisible()
  }

  const handleSave = async (values, record) => {
    const { product_id: id } = record
    try {
      const result = await requestUpdateProduct(id, values)
      const index = products.findIndex(product => product === record)
      const newProducts = [...products]
      newProducts.splice(index, 1, result)
      saveProducts(newProducts)
      message.success('修改成功')
    } catch (err) {
      message.error(err)
    }
  }

  const handleDelete = async record => {
    try {
      await requestDeleteProduct(record.product_id)
      saveProducts(products.filter(product => product !== record))
      message.success('删除成功')
    } catch (err) {
      message.error('删除失败')
    }
  }

  // 添加自定义操作列
  const newColumns = [...columns]
  newColumns.push({
    title: '操作',
    render: record => (
      <Button type='link' onClick={() => handleDelete(record)}>删除</Button>
    )
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
        handleSave={handleSave}
      />
      <AddModal ref={addModal} getProducts={getProducts} />
    </Card>
  )
}

Product.propTypes = {
  products: PropTypes.array,
  getProducts: PropTypes.func,
  saveProducts: PropTypes.func
}

export default connect(
  ({ products }) => ({ products }),
  { getProducts, saveProducts }
)(Product)
