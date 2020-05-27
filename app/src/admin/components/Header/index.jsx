import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Avatar, Row, Col, Dropdown, Menu } from 'antd'
import Storage from '../../../utils/Storage'

const { Item } = Menu

class Header extends Component {
  logout = () => {
    Storage.deleteMany(['userId', 'roleId', 'roken'])
    this.props.history.push('/')
  }

  render () {
    const menu = (
      <Menu>
        <Item
          key='profile'
          onClick={() => this.props.history.push('/')}
        >
          用户页面
        </Item>
        <Item
          key='logout'
          onClick={this.logout}
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
}

Header.propTypes = {
  history: PropTypes.object
}

export default withRouter(Header)
