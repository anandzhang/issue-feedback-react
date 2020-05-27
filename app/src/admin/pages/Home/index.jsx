import React, { Component } from 'react'
import { Card, Row, Col, Statistic } from 'antd'

class Home extends Component {
  render () {
    return (
      <Card>
        <Row gutter={16}>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Statistic title='今日用户反馈' value={112893} />
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Statistic title='今日管理员回复' value={112893} precision={2} />
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Statistic title='今日开发人员完善' value={112893} precision={2} />
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Home
