import React, { Component } from 'react'
import { Menu } from 'antd'
import menuConfig from './menuConfig'
import { SubMenu } from 'rc-menu'

const { Item } = Menu

class Sider extends Component {
  render () {
    return (
      <div>
        <Menu mode='inline'>
          {
            menuConfig.map(value => {
              const { title, icon, route, children } = value
              if (children) {
                return (
                  <SubMenu
                    key={route}
                    title={
                      <span>
                        {icon}
                        <span>{title}</span>
                      </span>
                    }
                  >
                    {
                      children.map(value => (
                        <Item key={value.route} icon={value.icon}>{value.title}</Item>
                      ))
                    }
                  </SubMenu>
                )
              }
              return (
                <Item key={route} icon={icon}>{title}</Item>
              )
            })
          }
        </Menu>
      </div>
    )
  }
}

export default Sider
