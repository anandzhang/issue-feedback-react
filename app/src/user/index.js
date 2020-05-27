import React from 'react'
import { Layout } from 'antd'
import route from '../routes/user'
import { Route } from 'react-router-dom'

const { Content } = Layout

const User = () => {
  return (
    <Layout>
      <Content>
        {route.map(value => <Route key={value.path} {...value} />)}
      </Content>
    </Layout>
  )
}

export default User
