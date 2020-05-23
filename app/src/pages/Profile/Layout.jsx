import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Avatar, Statistic } from 'antd'

class Layout extends Component {
  constructor (props) {
    super(props)
    this.avatar = (
      <Avatar
        size={64}
        shape='square'
        src='https://anand-app.oss-cn-beijing.aliyuncs.com/avatar/2.jpg'
        alt='avatar'
      />
    )
    this.state = {
      activeTabKey: props.tabList[0].key
    }
  }

  onTabChange = key => this.setState({ activeTabKey: key })

  render () {
    const { activeTabKey } = this.state
    const { profile, tabList, contentList } = this.props
    const { username, role } = profile
    return (
      <Row gutter={16} justify='center' style={{ marginTop: 20 }}>
        <Col span={6}>
          <Card>
            <Card.Meta
              avatar={this.avatar}
              title={username}
              description={role}
            />
          </Card>
          <Card style={{ marginTop: 12 }}>
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
            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={this.onTabChange}
          >
            {contentList[activeTabKey]}
          </Card>
        </Col>
      </Row>
    )
  }
}

Layout.propTypes = {
  profile: PropTypes.object,
  tabList: PropTypes.array,
  contentList: PropTypes.array
}

export default Layout
