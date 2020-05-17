import React, { Component } from 'react'
import { Layout } from 'antd'
import { requsetProfile } from '../../api/baseApi'
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import FeedbackList from '../../components/FeedbackList'
import './index.css'

const { Content } = Layout

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nickname: ''
    }
  }

  changeNickname = nickname => {
    this.setState({ nickname })
  }

  async componentDidMount () {
    const { ok, result } = await requsetProfile()
    if (ok) {
      const { nickname } = result
      this.setState({ nickname })
    }
  }

  render () {
    const { nickname } = this.state
    return (
      <Layout className='container'>
        <Header nickname={nickname} changeNickname={this.changeNickname} />
        <Content className='content'>
          <Banner />
          <FeedbackList nickname={nickname} />
        </Content>
      </Layout>
    )
  }
}

export default Home
