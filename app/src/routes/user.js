import React from 'react'
import Home from '../user/pages/Home'
import Profile from '../user/pages/Profile'

export default [
  {
    // 主页
    path: '/',
    exact: true,
    children: <Home />
  },
  {
    // 个人中心
    path: '/profile',
    exact: false,
    children: <Profile />
  }
]
