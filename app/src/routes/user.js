import React from 'react'
import Home from '../user/pages/Home'
import Problem from '../user/pages/Problem'
import Profile from '../user/pages/Profile'
import FeedbackDetail from '../user/pages/FeedbackDetail'

export default [
  {
    // 主页
    path: '/',
    exact: true,
    children: <Home />
  },
  {
    // 常见问题
    path: '/problem',
    exact: true,
    children: <Problem />
  },
  {
    // 个人中心
    path: '/profile',
    exact: false,
    children: <Profile />
  },
  {
    // 反馈详情
    path: '/feedback/:id',
    exact: false,
    children: <FeedbackDetail />
  }
]
