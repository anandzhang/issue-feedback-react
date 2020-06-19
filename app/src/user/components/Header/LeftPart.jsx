import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Col, Menu } from 'antd'
import navMenuConfig from './navMenuConfig'

const { Item } = Menu

const getMenuItem = () => navMenuConfig.map(value => {
  const { title, route } = value
  return (
    <Item key={route}>
      <Link to={route}>{title}</Link>
    </Item>
  )
})

const menu = getMenuItem()

const LeftPart = () => {
  const location = useLocation()
  const { pathname } = location

  return (
    <Col span={6}>
      <Menu
        mode='horizontal'
        defaultSelectedKeys={[pathname]}
        style={stylesheet.menu}
      >
        {menu}
      </Menu>
    </Col>
  )
}

const stylesheet = {
  menu: {
    lineHeight: '60px'
  }
}

export default LeftPart
