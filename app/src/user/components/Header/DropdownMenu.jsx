import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetProfile } from '../../../actions'
import { Menu, Dropdown, Button } from 'antd'
import Storage from '../../../utils/Storage'
import dropdownMenuConfig from './dropdownMenuConfig'

const { Item } = Menu

const DropdownMenu = ({ nickname, resetProfile }) => {
  const history = useHistory()

  const logout = () => {
    Storage.deleteMany(['userId', 'token'])
    resetProfile()
    history.push('/')
  }

  const getMenuItem = () => dropdownMenuConfig.map(value => {
    let { icon, title, route, onClick } = value
    if (!route) {
      // 特殊情况：退出登录
      route = 'logout'
      onClick = logout
    }
    return (
      <Item key={route} icon={icon}
        onClick={onClick || (() => history.push(route))}
      >
        {title}
      </Item>
    )
  })

  const overlay = <Menu>{getMenuItem()}</Menu>

  return (
    <Dropdown overlay={overlay} trigger={['click']}>
      <Button type='link'>{nickname}</Button>
    </Dropdown>
  )
}

DropdownMenu.propTypes = {
  nickname: PropTypes.string.isRequired,
  resetProfile: PropTypes.func
}

export default connect(null, { resetProfile })(DropdownMenu)
