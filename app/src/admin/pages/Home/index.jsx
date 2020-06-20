import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import CenterStatistic from '../../../comon/CenterStatistic'
import { requestManagerStatistic } from '../../../api/base'

const Home = () => {
  const [statistic, setStatistic] = useState([])
  useEffect(() => {
    getStatistic()
  }, [])

  const getStatistic = async () => {
    const result = await requestManagerStatistic()
    setStatistic([
      {
        title: '今日用户反馈',
        value: result.total_count
      },
      {
        title: '今日管理员受理',
        value: result.accepted_count
      },
      {
        title: '今日开发人员完成',
        value: result.closed_count
      }
    ])
  }

  return (
    <Card>
      <CenterStatistic dataSource={statistic} />
    </Card>
  )
}

export default Home
