import Home from '../admin/pages/Home'
import Feedback from '../admin/pages/Feedback'
import Product from '../admin/pages/Product'
import Role from '../admin/pages/Role'

export default [
  {
    // 主页
    path: '/admin',
    exact: true,
    component: Home
  },
  {
    // 反馈管理
    path: '/admin/manage/feedback',
    exact: false,
    component: Feedback
  },
  {
    // 产品管理
    path: '/admin/manage/product',
    exact: false,
    component: Product
  },
  {
    // 后台成员
    path: '/admin/role',
    exact: false,
    component: Role
  }
]
