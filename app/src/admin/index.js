import React from 'react'
import { Layout } from 'antd'
import { Route } from 'react-router-dom'
import route from '../routes/admin'
import SideNav from './components/SideNav'
import Header from './components/Header'

const { Sider, Content } = Layout

const Admin = () => (
  <Layout style={stylesheet.layout}>
    <Sider theme='light'><SideNav /></Sider>
    <Layout>
      <Header />
      <Content style={stylesheet.content}>
        {route.map(value => (
          <Route key={value.path} {...value} />))}
      </Content>
    </Layout>
  </Layout>
)

const stylesheet = {
  layout: {
    height: '100vh'
  },
  content: {
    padding: 20
  }
}

export default Admin
