import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import menu from './menu'
import './index.css'

const { Item } = Menu

class Header extends Component {
  constructor (props) {
    super(props)
    this._menu = menu.map(value => {
      const { title, icon, route } = value
      return (
        <Item key={route} icon={icon}>
          <Link to={route}>{title}</Link>
        </Item>
      )
    })
  }

  render () {
    return (
      <Menu mode='horizontal'>
        {this._menu}
        <Link to='/login' className='login'>登录</Link>
      </Menu>
    )
  }
}

export default Header
