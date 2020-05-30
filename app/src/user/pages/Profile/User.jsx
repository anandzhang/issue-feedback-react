import React from 'react'
import Layout from './Layout'
import FeedbackList from './FeedbackList'

const profile = {
  username: '测试人',
  role: 'USER'
}

const feedbackSource = [
  { title: '程序总是闪退', time: '5.12' },
  { title: '太卡了，根本没法耍', time: '5.12' },
  { title: '总是掉线，为什么', time: '5.12' }
]

const replySource = [
  { title: '回复1', time: '5.12' },
  { title: '回复2', time: '5.12' },
  { title: '回复3', time: '5.12' }
]

const tabList = [
  {
    key: 'feedback',
    tab: '提出的反馈'
  },
  {
    key: 'reply',
    tab: '收到的回复'
  }
]

const contentList = {
  feedback: <FeedbackList dataSource={feedbackSource} />,
  reply: <FeedbackList dataSource={replySource} />
}

const User = () => (
  <Layout
    profile={profile}
    tabList={tabList}
    contentList={contentList}
  />
)

export default User
