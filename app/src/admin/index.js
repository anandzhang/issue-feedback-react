import React from 'react'
import { Layout } from 'antd'
import { Route } from 'react-router-dom'
import route from '../routes/admin'
import SideNav from './components/SideNav'
import Header from './components/Header'

const { Sider, Content } = Layout

const Admin = () => (
  <Layout style={{ height: '100vh' }}>
    <Sider theme='light'><SideNav /></Sider>
    <Layout>
      <Header />
      <Content style={{ padding: 20 }}>
        {route.map(value => <Route key={value.path} {...value} />)}
      </Content>
    </Layout>
  </Layout>
)

export default Admin
