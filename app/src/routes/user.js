import Home from '../user/pages/Home'
import Profile from '../user/pages/Profile'
import Feedback from '../user/pages/Feedback'

export default [
  {
    // 主页
    path: '/',
    exact: true,
    component: Home
  },
  {
    // 个人中心
    path: '/profile',
    exact: false,
    component: Profile
  },
  {
    // 反馈详情
    path: '/feedback/:id',
    exact: false,
    component: Feedback
  }
]
