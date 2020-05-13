import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import menuConfig from './menuConfig'
import './index.css'

const { Item } = Menu

function Header () {
  const menu = menuConfig.map(value => {
    const { title, route } = value
    return (
      <Item key={route}>
        <Link to={route}>{title}</Link>
      </Item>
    )
  })

  return (
    <Menu mode='horizontal' className='menu'>
      {menu}
      <Link to='/login' className='login'>登录</Link>
    </Menu>
  )
}

export default Header
