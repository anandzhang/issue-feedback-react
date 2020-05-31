import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { updateProfile } from '../../../actions'
import { Menu, Button, Row, Col, Dropdown, message } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  UserOutlined,
  LogoutOutlined,
  ControlOutlined
} from '@ant-design/icons'
import menuConfig from './menuConfig'
import { requsetProfile } from '../../../api/base'
import Storage from '../../../utils/Storage'
import Account from '../Account'
import './index.css'

const { Item } = Menu

const Header = props => {
  const { nickname, updateProfile } = props
  const accountModal = React.useRef()
  useEffect(() => {
    getNickname()
  }, [])

  const getNickname = async () => {
    const userId = Storage.get('userId')
    if (userId) {
      try {
        const result = await requsetProfile(userId)
        const { nickname } = result
        updateProfile({ nickname })
      } catch (err) {
        message.error(err)
      }
    }
  }

  const getMenuItem = () => menuConfig.map(value => {
    const { title, route } = value
    return (
      <Item key={route}>
        <Link to={route}>{title}</Link>
      </Item>
    )
  })

  const menu = getMenuItem()

  const showLoginModal = () => {
    accountModal.current.showLoginModal()
  }

  const logout = () => {
    Storage.deleteMany(['userId', 'roleId', 'token'])
    updateProfile({ nickname: '' })
    props.history.push('/')
  }

  const userMenu = (
    <Menu>
      <Item
        key='profile'
        icon={<UserOutlined />}
        onClick={() => props.history.push('/profile')}
      >
        个人中心
      </Item>
      <Item
        key='admin'
        icon={<ControlOutlined />}
        onClick={() => props.history.push('/admin')}
      >
        后台管理
      </Item>
      <Item
        key='logout'
        icon={<LogoutOutlined />}
        onClick={logout}
      >
        退出登录
      </Item>
    </Menu>
  )
  return (
    <Row className='header'>
      <Col span={6}>
        <Menu mode='horizontal' className='menu'>
          {menu}
        </Menu>
      </Col>
      <Col className='login' span={2} offset={16}>
        {
          nickname
            ? (
              <Dropdown overlay={userMenu} trigger={['click']}>
                <Button type='link'>{nickname}</Button>
              </Dropdown>
            )
            : <Button type='link' onClick={showLoginModal}>登录</Button>
        }
        <Account ref={accountModal} />
      </Col>
    </Row>
  )
}

Header.propTypes = {
  nickname: PropTypes.string,
  updateProfile: PropTypes.func,
  history: PropTypes.object
}

export default connect(
  ({ profile }) => ({ nickname: profile.nickname }),
  { updateProfile }
)(withRouter(Header))
