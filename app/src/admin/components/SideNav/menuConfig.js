import React from 'react'
import {
  HomeOutlined,
  AppstoreOutlined,
  MessageOutlined,
  InboxOutlined,
  SettingOutlined,
  QuestionOutlined,
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
    title: '设置',
    icon: <SettingOutlined />,
    route: '/admin/setting',
    children: [
      {
        title: '常见问题',
        icon: <QuestionOutlined />,
        route: '/admin/setting/problem'
      }
    ]
  },
  {
    title: '后台成员',
    icon: <TeamOutlined />,
    route: '/admin/role'
  }
]
