import React from 'react'
import {
  UserOutlined,
  ControlOutlined,
  LogoutOutlined
} from '@ant-design/icons'

export default [
  {
    title: '个人中心',
    icon: <UserOutlined />,
    route: '/profile'
  },
  {
    title: '后台管理',
    icon: <ControlOutlined />,
    route: '/admin'
  },
  {
    title: '退出登录',
    icon: <LogoutOutlined />
  }
]
