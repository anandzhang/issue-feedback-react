import React from 'react'
import { Card, Table, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import data from './data'
import columns from './columns'

const Problem = () => {
  return (
    <Card
      title='常见问题'
      extra={
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => message.warning('暂未开放')}
        >
          添加问题
        </Button>
      }
    >
      <Table
        dataSource={data}
        columns={columns}
      />
    </Card>
  )
}

export default Problem
