import React from 'react'
import { Layout } from 'antd'
import { Route } from 'react-router-dom'
import route from '../routes/user'
import Header from './components/Header'
import './index.css'

const { Content } = Layout

const User = () => {
  return (
    <Layout className='container'>
      <Header />
      <Content className='content'>
        {route.map(value => <Route key={value.path} {...value} />)}
      </Content>
    </Layout>
  )
}

export default User
