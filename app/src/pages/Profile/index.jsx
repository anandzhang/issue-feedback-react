import React, { Component } from 'react'
import { Row, Col, Card, Avatar, Menu, Statistic, List } from 'antd'

const { Item } = Menu

class Profile extends Component {
  state={
    activeTabKey: 'feedback'
  }
  contentList = {
    feedback: (
      <List
        dataSource={[
          { title: '反馈1', time: '5.12' },
          { title: '反馈2', time: '5.12' },
          { title: '反馈3', time: '5.12' }
        ]}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={item.time}
            />
          </List.Item>
        )}
      />
    ),
    reply: (
      <List
        dataSource={[
          { title: '回复1', time: '5.12' },
          { title: '回复2', time: '5.12' },
          { title: '回复3', time: '5.12' }
        ]}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={item.time}
            />
          </List.Item>
        )}
      />
    )
  }
  onTabChange = key => {
    this.setState({
      activeTabKey: key
    })
  }
  render() {
    const {activeTabKey} = this.state
    const avatar = (
      <Avatar
        shape='square'
        size={64}
        src='https://anand-app.oss-cn-beijing.aliyuncs.com/avatar/2.jpg'
        alt='avatar'
      />
    )
    return (
      <div>
        <Row gutter={16} justify='center' style={{marginTop:20}} >
          <Col span={6}>
            <Card>
              <Card.Meta
                avatar={avatar}
                title='测试人1'
                description='sss'
              />
            </Card>
            <Card style={{marginTop:12}}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="反馈" value={3} style={{ textAlign: 'center' }} />
                </Col>
                <Col span={12}>
                  <Statistic title="已解决" value={2} style={{ textAlign: 'center' }} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={17}>
            <Card
              tabList={[
                {
                  key: 'feedback',
                  tab: '提出的反馈',
                },
                {
                  key: 'reply',
                  tab: '收到的回复',
                }
              ]}
              activeTabKey={activeTabKey}
              onTabChange={this.onTabChange}
            >
              {this.contentList[activeTabKey]}
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Profile
