import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import { requsetProfile } from '../../api/baseApi'
import Header from '../../components/Header'
import Feedback from '../Feedback'
import Profile from '../Profile'
import './index.css'

const { Content } = Layout

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: ''
    }
  }

  changeNickname = nickname => {
    this.setState({ nickname })
  }

  async componentDidMount() {
    const { ok, result } = await requsetProfile()
    if (ok) {
      const { nickname } = result
      this.setState({ nickname })
    }
  }

  render() {
    const { nickname } = this.state
    return (
      <Layout className='container'>
        <Header nickname={nickname} changeNickname={this.changeNickname} />
        <Content className='content'>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' state={nickname} component={Feedback} />
              <Route path='/profile' component={Profile} />
              <Redirect to='/' />
            </Switch>
          </BrowserRouter>
        </Content>
      </Layout>
    )
  }
}

export default Home
