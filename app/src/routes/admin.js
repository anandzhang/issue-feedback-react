import React from 'react'
import Home from '../admin/pages/Home'
import Feedback from '../admin/pages/Feedback'
import FeedbackDetail from '../admin/pages/FeedbackDetail'
import Product from '../admin/pages/Product'
import Role from '../admin/pages/Role'

export default [
  {
    // 主页
    path: '/admin',
    exact: true,
    children: <Home />
  },
  {
    // 反馈管理
    path: '/admin/manage/feedback',
    exact: true,
    children: <Feedback />
  },
  {
    // 反馈管理
    path: '/admin/manage/feedback/detail',
    exact: false,
    children: <FeedbackDetail />
  },
  {
    // 产品管理
    path: '/admin/manage/product',
    exact: false,
    children: <Product />
  },
  {
    // 后台成员
    path: '/admin/role',
    exact: false,
    children: <Role />
  }
]
