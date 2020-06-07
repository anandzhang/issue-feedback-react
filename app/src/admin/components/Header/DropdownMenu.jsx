import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetProfile } from '../../../actions'
import { Avatar, Dropdown, Menu } from 'antd'
import Storage from '../../../utils/Storage'
import dropdownMenuConfig from './dropdownMenuConfig'

const { Item } = Menu

const DropdownMenu = ({ resetProfile }) => {
  const history = useHistory()

  const logout = () => {
    Storage.deleteMany(['userId', 'token'])
    resetProfile()
    history.push('/')
  }

  const getMenuItem = () => dropdownMenuConfig.map(value => {
    let { title, route, onClick } = value
    if (!route) {
      // 特殊情况：退出登录
      route = 'logout'
      onClick = logout
    }
    return (
      <Item key={route}
        onClick={onClick || (() => history.push(route))}
      >
        {title}
      </Item>
    )
  })

  const overlay = <Menu>{getMenuItem()}</Menu>
  return (
    <Dropdown overlay={overlay} trigger={['click']}>
      <Avatar
        size='large'
        src='/images/avatar.jpg'
        alt='avatar'
        style={{ cursor: 'pointer' }}
      />
    </Dropdown>
  )
}

DropdownMenu.propTypes = {
  resetProfile: PropTypes.func
}

export default connect(null, { resetProfile })(DropdownMenu)
