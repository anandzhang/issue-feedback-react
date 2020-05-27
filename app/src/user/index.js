import React, { useState, useEffect } from 'react'
import { Layout, message } from 'antd'
import { Route } from 'react-router-dom'
import route from '../routes/user'
import Header from './components/Header'
import Storage from '../utils/Storage'
import { requsetProfile } from '../api/base'
import './index.css'

const { Content } = Layout

const User = () => {
  const [nickname, setNickname] = useState('')
  useEffect(() => {
    getNickname()
  }, [])

  const getNickname = async () => {
    const userId = Storage.get('userId')
    if (userId) {
      try {
        const result = await requsetProfile(userId)
        const { nickname } = result
        setNickname(nickname)
      } catch (err) {
        message.error(err)
      }
    }
  }

  return (
    <Layout className='container'>
      <Header nickname={nickname} setNickname={setNickname} />
      <Content className='content'>
        {route.map(value => <Route key={value.path} {...value} />)}
      </Content>
    </Layout>
  )
}

export default User
