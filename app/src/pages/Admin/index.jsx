import React, { Component } from 'react'
import { Layout, Card } from 'antd'
import SiderMenu from '../../components/Sider'
import AdminHeader from '../../components/AdminHeader'

const { Sider, Content } = Layout

class Admin extends Component {
  render () {
    return (
      <Layout>
        <Sider theme='light'><SiderMenu /></Sider>
        <Layout>
          <AdminHeader />
          <Content style={{ padding: 20 }}>
            <Card>
              content
            </Card>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
