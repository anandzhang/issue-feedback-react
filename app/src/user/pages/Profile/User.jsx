import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import FeedbackList from './FeedbackList'
import { requestUserFeedbackList, requestUserStatistic } from '../../../api/base'
import { message } from 'antd'
import STATUS from '../../../constants/Status'

const tabList = [
  {
    key: 'feedback',
    tab: '提出的反馈'
  },
  {
    key: 'reply',
    tab: '已解决'
  }
]

const User = () => {
  const [statistic, setStatistic] = useState([])
  const [feedback, setFeedback] = useState([])
  useEffect(() => {
    getUserStatistic()
    getUserSubmitFeedbackList()
  }, [])

  const getUserStatistic = async () => {
    try {
      const result = await requestUserStatistic()
      setStatistic([
        {
          title: '提出反馈',
          value: result.total_count
        },
        {
          title: '已解决',
          value: result.solved_count
        }
      ])
    } catch (err) {
      message.error('' + err)
    }
  }

  const getUserSubmitFeedbackList = async () => {
    try {
      const { issues } = await requestUserFeedbackList()
      setFeedback(issues)
    } catch (err) {
      message.error('' + err)
    }
  }

  const contentList = {
    feedback: <FeedbackList dataSource={feedback} />,
    reply: (
      <FeedbackList
        dataSource={feedback.filter(item => item.status === STATUS.CLOSED)}
      />
    )
  }

  return (
    <Layout
      statisticDataSource={statistic}
      tabList={tabList}
      contentList={contentList}
    />
  )
}

export default User
