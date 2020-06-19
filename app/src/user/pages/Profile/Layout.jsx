import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Avatar } from 'antd'
import CenterStatistic from '../../../comon/CenterStatistic'
import { connect } from 'react-redux'

const avatar = (
  <Avatar
    size={64}
    shape='square'
    src='/images/avatar.jpg'
    alt='avatar'
  />
)

// TODO: 后端无接口
const statisticDataSource = [
  {
    title: '反馈',
    value: 3
  },
  {
    title: '已解决',
    value: 6
  }
]

const Layout = props => {
  const { profile, tabList, contentList } = props
  const { nickname, roleId } = profile
  const [activeTabKey, setActiveTabKey] = useState(props.tabList[0].key)

  const onTabChange = key => setActiveTabKey(key)

  return (
    <Row gutter={16} justify='center' style={{ marginTop: 20 }}>
      <Col span={6}>
        <Card>
          <Card.Meta
            avatar={avatar}
            title={nickname}
            description={roleId}
          />
        </Card>
        <Card style={{ marginTop: 12 }}>
          <CenterStatistic dataSource={statisticDataSource} />
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
  contentList: PropTypes.object
}

export default connect(
  ({ profile }) => ({ profile })
)(Layout)
