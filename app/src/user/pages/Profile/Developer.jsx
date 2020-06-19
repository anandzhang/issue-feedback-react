import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import FeedbackList from './FeedbackList'
import { message } from 'antd'
import { testDeveloperFeedbackList } from '../../../api/base'
import STATUS from '../../../constants/Status'

const tabList = [
  {
    key: 'opening',
    tab: '正在处理'
  },
  {
    key: 'closed',
    tab: '已解决'
  }
]

const Developer = () => {
  const [feedback, setFeedback] = useState([])
  useEffect(() => {
    getDeveloperSubmitFeedbackList()
  }, [])

  const getDeveloperSubmitFeedbackList = async () => {
    try {
      const { ok, result } = await testDeveloperFeedbackList()
      if (ok) {
        const { issues } = result
        setFeedback(issues)
      } else message.error('获取失败')
    } catch (err) {
      message.error('' + err)
    }
  }

  const contentList = {
    opening: (
      <FeedbackList
        dataSource={feedback.filter(item => item.status === STATUS.OPENING)}
      />
    ),
    closed: (
      <FeedbackList
        dataSource={feedback.filter(item => item.status === STATUS.CLOSED)}
      />
    )
  }

  return (
    <Layout
      tabList={tabList}
      contentList={contentList}
    />
  )
}

export default Developer
