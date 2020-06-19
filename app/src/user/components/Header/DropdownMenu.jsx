import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetProfile } from '../../../actions'
import { Menu, Dropdown, Button } from 'antd'
import {
  UserOutlined,
  ControlOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import Storage from '../../../utils/Storage'

const { Item } = Menu

const DropdownMenu = ({ profile, resetProfile }) => {
  const { nickname, roleId } = profile
  const history = useHistory()

  const logout = () => {
    Storage.deleteMany(['userId', 'token'])
    resetProfile()
    history.push('/')
  }

  const overlay = (
    <Menu>
      {roleId === 'MANAGER'
        ? (
          <Item
            icon={<ControlOutlined />}
            onClick={() => history.push('/admin')}
          >
            后台管理
          </Item>
        )
        : (
          <Item
            icon={<UserOutlined />}
            onClick={() => history.push('/profile')}
          >
            个人中心
          </Item>
        )}
      <Item
        icon={<LogoutOutlined />}
        onClick={logout}
      >
        退出登录
      </Item>
    </Menu>
  )

  return (
    <Dropdown overlay={overlay} trigger={['click']}>
      <Button type='link'>{nickname}</Button>
    </Dropdown>
  )
}

DropdownMenu.propTypes = {
  profile: PropTypes.object,
  resetProfile: PropTypes.func
}

export default connect(
  ({ profile }) => ({ profile }),
  { resetProfile }
)(DropdownMenu)
