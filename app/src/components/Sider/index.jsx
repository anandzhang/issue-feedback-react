import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import menuConfig from './menuConfig'
import { SubMenu } from 'rc-menu'

const { Item } = Menu

class Sider extends Component {
  constructor (props) {
    super(props)
    this.menu = this.getMenu()
  }

  getMenu = () => {
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
            {children.map(value => this.getMenuItem(value))}
          </SubMenu>
        )
      }
      return this.getMenuItem(value)
    })
  }

  getMenuItem = value => {
    const { title, icon, route } = value
    return (
      <Item key={route} icon={icon}>
        <Link to={route}>{title}</Link>
      </Item>
    )
  }

  getParentPath = pathname => {
    pathname = pathname.split('/')
    pathname.pop()
    return pathname.join('/')
  }

  render () {
    const { pathname } = this.props.location
    const parentPath = this.getParentPath(pathname)
    return (
      <div>
        <Menu
          mode='inline'
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[parentPath]}
        >
          {this.getMenu()}
        </Menu>
      </div>
    )
  }
}

Sider.propTypes = {
  location: PropTypes.object
}

export default withRouter(Sider)
