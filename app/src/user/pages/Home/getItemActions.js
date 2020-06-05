import React from 'react'
import { Space } from 'antd'
import {
  LikeOutlined,
  MessageOutlined,
  EllipsisOutlined
} from '@ant-design/icons'

const getItemActions = (likes, comments) => [
  (
    <Space key='likes'>
      <LikeOutlined />{likes}
    </Space>
  ),
  (
    <Space key='comments'>
      <MessageOutlined />{comments}
    </Space>
  ),
  (
    <Space key='more'>
      <EllipsisOutlined />
    </Space>
  )
]

export default getItemActions
