import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Avatar, Button } from 'antd'
import CenterStatistic from '../../../comon/CenterStatistic'
import { connect } from 'react-redux'
import ModifyProfile from './ModifyProfile'

const Layout = props => {
  const { profile, statisticDataSource, tabList, contentList } = props
  const { nickname, roleId, avatar } = profile
  const modifyProfileModal = useRef(null)
  const [activeTabKey, setActiveTabKey] = useState(props.tabList[0].key)

  const onTabChange = key => setActiveTabKey(key)

  return (
    <Row gutter={16} justify='center' style={{ marginTop: 20 }}>
      <Col span={6}>
        <Card>
          <Card.Meta
            avatar={(
              <Avatar
                size={64}
                shape='square'
                src={avatar || '/images/avatar1.jpg'}
                alt='avatar'
              />
            )}
            title={nickname}
            description={(
              <>
                {roleId}
                <Button
                  type='link'
                  onClick={() => modifyProfileModal.current.changeVisible()}>
                  修改资料
                </Button>
                <ModifyProfile ref={modifyProfileModal} />
              </>
            )}
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
  statisticDataSource: PropTypes.array,
  tabList: PropTypes.array,
  contentList: PropTypes.object
}

export default connect(
  ({ profile }) => ({ profile })
)(Layout)
