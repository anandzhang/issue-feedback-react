import React, { Component } from 'react'
import { Menu, Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
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

  render () {
    return (
      <Row className='header'>
        <Col span={6}>
          <Menu mode='horizontal' className='menu'>
            {this.menu}
          </Menu>
        </Col>
        <Col className='login' span={2} offset={16}>
          <Button type='link' onClick={this.showModal}>登录</Button>
          <Account ref={this.accountModal} />
        </Col>
      </Row>
    )
  }
}

export default Header