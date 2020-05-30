import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import menuConfig from './menuConfig'

const { Item, SubMenu } = Menu

const SideNav = props => {
  const getMenu = () => {
    return menuConfig.map(value => {
      const { children } = value
      if (children) {
        const { title, icon, route } = value
        return (
          <SubMenu
            key={route}
            title={
              <span>
                {icon}<span>{title}</span>
              </span>
            }
          >
            {children.map(value => getMenuItem(value))}
          </SubMenu>
        )
      }
      return getMenuItem(value)
    })
  }

  const getMenuItem = value => {
    const { title, icon, route } = value
    return (
      <Item key={route} icon={icon}>
        <Link to={route}>{title}</Link>
      </Item>
    )
  }

  const getParentPath = pathname => {
    pathname = pathname.split('/')
    pathname.pop()
    return pathname.join('/')
  }

  const menu = getMenu()
  const { pathname } = props.location
  const parentPath = getParentPath(pathname)
  return (
    <div>
      <Menu
        mode='inline'
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[parentPath]}
      >
        {menu}
      </Menu>
    </div>
  )
}

SideNav.propTypes = {
  location: PropTypes.object
}

export default withRouter(SideNav)
