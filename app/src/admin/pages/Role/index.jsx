import React, { useRef } from 'react'
import { Card, Table, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import AddModal from './AddModal'

const columns = [
  {
    title: '用户名',
    dataIndex: 'nickname'
  },
  {
    title: '身份',
    dataIndex: 'role_id'
  }
]

const Role = () => {
  const addModal = useRef(null)

  const showAddModal = () => {
    addModal.current.changeVisible()
  }

  return (
    <Card
      title='后台成员'
      extra={
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={showAddModal}
        >
          添加成员
        </Button>
      }
    >
      <Table dataSource={[]} columns={columns} />
      <AddModal ref={addModal} />
    </Card>
  )
}

export default Role
