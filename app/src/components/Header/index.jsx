import React, { Component } from 'react'
import { Menu, Button, Row, Col, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import menuConfig from './menuConfig'
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

  showModal = () => {
    this.accountModal.current.changeVisible()
  }

  changeNickname = nickname => {
    this.setState({ nickname })
  }

  render () {
    const { nickname, changeNickname } = this.props
    const menu = (
      <Menu>
        <Item key='profile' icon={<UserOutlined />}>个人中心</Item>
        <Item key='logout' icon={<LogoutOutlined />}>退出登录</Item>
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
              : <Button type='link' onClick={this.showModal}>登录</Button>
          }
          <Account ref={this.accountModal} changeNickname={changeNickname} />
        </Col>
      </Row>
    )
  }
}

Header.propTypes = {
  nickname: PropTypes.string,
  changeNickname: PropTypes.func
}

export default Header
