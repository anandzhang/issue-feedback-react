import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Avatar, Statistic } from 'antd'

const avatar = (
  <Avatar
    size={64}
    shape='square'
    src='/images/avatar.jpg'
    alt='avatar'
  />
)

const Layout = props => {
  const { profile, tabList, contentList } = props
  const { username, role } = profile
  const [activeTabKey, setActiveTabKey] = useState(props.tabList[0].key)

  const onTabChange = key => setActiveTabKey(key)

  return (
    <Row gutter={16} justify='center' style={{ marginTop: 20 }}>
      <Col span={6}>
        <Card>
          <Card.Meta
            avatar={avatar}
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
          onTabChange={onTabChange}
        >
          {contentList[activeTabKey]}
        </Card>
      </Col>
    </Row>
  )
}

Layout.propTypes = {
  profile: PropTypes.object,
  tabList: PropTypes.array,
  contentList: PropTypes.array
}

export default Layout
