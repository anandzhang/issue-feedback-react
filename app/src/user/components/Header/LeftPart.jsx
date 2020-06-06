import React from 'react'
import { Link } from 'react-router-dom'
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

const LeftPart = () => (
  <Col span={6}>
    <Menu mode='horizontal' style={stylesheet.menu}>
      {menu}
    </Menu>
  </Col>
)

const stylesheet = {
  menu: {
    lineHeight: '60px'
  }
}

export default LeftPart
