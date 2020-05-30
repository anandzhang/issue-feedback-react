import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Avatar, Row, Col, Dropdown, Menu } from 'antd'
import Storage from '../../../utils/Storage'

const { Item } = Menu

const Header = props => {
  const logout = () => {
    Storage.deleteMany(['userId', 'roleId', 'token'])
    props.history.push('/')
  }

  const menu = (
    <Menu>
      <Item
        key='profile'
        onClick={() => props.history.push('/')}
      >
        用户页面
      </Item>
      <Item
        key='logout'
        onClick={logout}
      >
        退出登录
      </Item>
    </Menu>
  )
  return (
    <Row justify='end' style={{ backgroundColor: '#fff', padding: '8px 20px' }}>
      <Col>
        <Dropdown overlay={menu} trigger={['click']}>
          <Avatar
            size='large'
            src='https://anand-app.oss-cn-beijing.aliyuncs.com/avatar/2.jpg'
            alt='avatar'
            style={{ cursor: 'pointer' }}
          />
        </Dropdown>
      </Col>
    </Row>
  )
}

Header.propTypes = {
  history: PropTypes.object
}

export default withRouter(Header)
