import React, { Component } from 'react'
import { Card, Avatar, Row, Col, Button, List } from 'antd'
import axios from 'axios'
import './index.css'

const { Meta } = Card

class FeedbackList extends Component {
  state = {
    feedback: [],
    fixed: []
  }

  getFeedback = async () => {
    const data = await axios.get('/feedback.json')
    this.setState({ feedback: data })
  }

  getFixed = async () => {
    const data = await axios.get('/fixed.json')
    this.setState({ fixed: data })
  }

  componentDidMount () {
    this.getFeedback()
    this.getFixed()
  }

  renderFeedback = () => {
    const { feedback } = this.state
    return feedback.map(value => {
      const avatar = (
        <Avatar
          shape='square'
          size='large'
          src={value.avatar}
          alt={`${value.nickname}-avatar`}
        />
      )
      return (
        <Card key={value.id} className='feedback-item'>
          <Meta
            avatar={avatar}
            title={value.nickname}
            description={value.content}
          />
        </Card>
      )
    })
  }

  render () {
    const { fixed } = this.state
    return (
      <div>
        <div className='feedback-title'>最近反馈</div>
        <Row gutter={12}>
          <Col span={18}>{this.renderFeedback()}</Col>
          <Col span={6}>
            <Card className='margin-t-10'>
              <Button type='primary' className='feedback-btn'>反馈一下</Button>
            </Card>
            <Card title='最新动态' className='margin-t-10'>
              <List
                dataSource={fixed}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FeedbackList
