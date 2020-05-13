import React, { Component } from 'react'
import { Card, Avatar, Row, Col, Button, List } from 'antd'
import axios from 'axios'

const { Meta } = Card

class FeedbackList extends Component {
  state = {
    feedback: [],
    fixed: []
  }

  getFeedback = async () => {
    const { data } = await axios.get('/feedback.json')
    this.setState({ feedback: data })
  }

  getFixed = async () => {
    const { data } = await axios.get('/fixed.json')
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
          style={{ float: 'left', marginRight: 20 }}
        />
      )
      return (
        <Card key={value.id} style={{ margin: '10px 0' }}>
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
        <div style={{ fontSize: 16, margin: 20 }}>最近反馈</div>
        <Row gutter={12}>
          <Col span={18}>{this.renderFeedback()}</Col>
          <Col span={6}>
            <Card style={{ marginTop: 10 }}><Button type='primary'>反馈一下</Button></Card>
            <Card title='最新动态' style={{ marginTop: 12 }}>
              <List
                dataSource={fixed}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}

export default FeedbackList
