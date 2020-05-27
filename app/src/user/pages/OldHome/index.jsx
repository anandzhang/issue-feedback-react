import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import { requsetProfile } from '../../../api/base'
import Header from '../../components/Header'
import Feedback from '../Feedback'
import Profile from '../Profile'
import './index.css'
import Storage from '../../../utils/Storage'

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
    const userId = Storage.get('userId')
    if (userId) {
      const result = await requsetProfile(userId)
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
          <Switch>
            <Route exact path='/' component={Feedback} />
            <Route path='/profile' component={Profile} />
            <Redirect to='/' />
          </Switch>
        </Content>
      </Layout>
    )
  }
}

export default Home