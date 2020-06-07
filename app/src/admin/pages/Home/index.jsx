import React from 'react'
import { Card } from 'antd'
import CenterStatistic from '../../../comon/CenterStatistic'

const statisticDataSource = [
  {
    title: '今日用户反馈',
    value: 112893
  },
  {
    title: '今日管理员回复',
    value: 112893
  },
  {
    title: '今日开发人员完善',
    value: 112893
  }
]

const Home = () => (
  <Card>
    <CenterStatistic dataSource={statisticDataSource} />
  </Card>
)

export default Home
