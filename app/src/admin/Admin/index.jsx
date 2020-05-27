import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import SiderMenu from '../components/SideNav'
import Header from '../../components/AdminHeader'
import Dashboard from '../Dashboard'
import Feedback from '../AdminFeedback'
import Product from '../Product'
import Role from '../Role'

const { Sider, Content } = Layout

class Admin extends Component {
  render () {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider theme='light'><SiderMenu /></Sider>
        <Layout>
          <Header />
          <Content style={{ padding: 20 }}>
            <Switch>
              <Route exact path='/admin' component={Dashboard} />
              <Route path='/admin/manage/feedback' component={Feedback} />
              <Route path='/admin/manage/product' component={Product} />
              <Route path='/admin/role' component={Role} />
              <Redirect to='/admin' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
