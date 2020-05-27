import React from 'react'
import {
  HomeOutlined,
  AppstoreOutlined,
  MessageOutlined,
  InboxOutlined,
  TeamOutlined
} from '@ant-design/icons'

export default [
  {
    title: '首页',
    icon: <HomeOutlined />,
    route: '/admin'
  },
  {
    title: '管理',
    icon: <AppstoreOutlined />,
    route: '/admin/manage',
    children: [
      {
        title: '反馈管理',
        icon: <MessageOutlined />,
        route: '/admin/manage/feedback'
      },
      {
        title: '产品管理',
        icon: <InboxOutlined />,
        route: '/admin/manage/product'
      }
    ]
  },
  {
    title: '后台成员',
    icon: <TeamOutlined />,
    route: '/admin/role'
  }
]
