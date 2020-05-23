import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import User from './User'
import Manager from './Manager'
import Developer from './Developer'
import Storage from '../../utils/Storage'
import { message } from 'antd'

class Profile extends Component {
  roleId = Storage.get('roleId')

  componentDidMount () {
    switch (this.roleId) {
      case 'USER':
        this.content = <User />
        break
      case 'MANAGER':
        this.content = <Manager />
        break
      case 'DEVELOPER':
        this.content = <Developer />
        break
      default:
        message.error('没有你的角色信息')
        this.props.history.push('/')
    }
  }

  render () {
    return <Fragment>{this.content}</Fragment>
  }
}

Profile.propTypes = {
  history: PropTypes.func
}

export default Profile
