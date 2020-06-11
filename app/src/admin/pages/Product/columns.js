import React from 'react'
import { Button } from 'antd'
import chinaDate from '../../../utils/chinaDate'
import { requestDeleteProduct } from '../../../api/base'

export default [
  {
    title: '名称',
    dataIndex: 'name',
    editable: true
  },
  {
    title: '描述',
    dataIndex: 'description',
    editable: true
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    render: date => chinaDate(date).fromNow()
  },
  {
    title: '创建人',
    dataIndex: 'manager_id'
  },
  {
    title: '操作',
    render: ({ product_id: id }) => (
      <Button type='link' onClick={() => requestDeleteProduct(id)}>删除</Button>
    )
  }
]
