import React, { Component } from 'react'
import { Menu, Button, Row, Col, Dropdown } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { UserOutlined, LogoutOutlined, ControlOutlined } from '@ant-design/icons'
import menuConfig from './menuConfig'
import Storage from '../../utils/Storage'
import Account from '../Account'
import './index.css'

const { Item } = Menu

class Header extends Component {
  constructor (props) {
    super(props)
    this.menu = this.getMenuItem()
    this.accountModal = React.createRef()
  }

  getMenuItem = () => menuConfig.map(value => {
    const { title, route } = value
    return (
      <Item key={route}>
        <Link to={route}>{title}</Link>
      </Item>
    )
  })

  showLoginModal = () => this.accountModal.current.showLoginModal()

  logout = () => {
    Storage.deleteMany(['userId', 'roleId', 'roken'])
    this.props.changeNickname('')
    this.props.history.push('/')
  }

  render () {
    const { nickname, changeNickname } = this.props
    const menu = (
      <Menu>
        <Item
          key='profile'
          icon={<UserOutlined />}
          onClick={() => this.props.history.push('/profile')}
        >
          个人中心
        </Item>
        <Item
          key='admin'
          icon={<ControlOutlined />}
          onClick={() => this.props.history.push('/admin')}
        >
          后台管理
        </Item>
        <Item
          key='logout'
          icon={<LogoutOutlined />}
          onClick={this.logout}
        >
          退出登录
        </Item>
      </Menu>
    )
    return (
      <Row className='header'>
        <Col span={6}>
          <Menu mode='horizontal' className='menu'>
            {this.menu}
          </Menu>
        </Col>
        <Col className='login' span={2} offset={16}>
          {
            nickname
              ? (
                <Dropdown overlay={menu} trigger={['click']}>
                  <Button type='link'>{nickname}</Button>
                </Dropdown>
              )
              : <Button type='link' onClick={this.showLoginModal}>登录</Button>
          }
          <Account ref={this.accountModal} changeNickname={changeNickname} />
        </Col>
      </Row>
    )
  }
}

Header.propTypes = {
  nickname: PropTypes.string,
  changeNickname: PropTypes.func,
  history: PropTypes.object
}

export default withRouter(Header)
