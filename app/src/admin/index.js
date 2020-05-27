import React from 'react'
import { Layout } from 'antd'
import { Route } from 'react-router-dom'
import route from '../routes/admin'

const { Sider, Content } = Layout

const Admin = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme='light'>sider</Sider>
      <Layout>
        <Content style={{ padding: 20 }}>
          {route.map(value => <Route key={value.path} {...value} />)}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Admin
