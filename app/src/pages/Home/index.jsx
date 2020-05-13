import React, { Component } from 'react'
import { Layout } from 'antd'
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import FeedbackList from '../../components/FeedbackList'
import './index.css'

const { Content } = Layout

class Home extends Component {
  render () {
    return (
      <Layout className='container'>
        <Header />
        <Content className='content'>
          <Banner />
          <FeedbackList />
        </Content>
      </Layout>
    )
  }
}

export default Home
