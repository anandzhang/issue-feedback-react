import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import User from './User'
import Manager from './Manager'
import Developer from './Developer'
import Storage from '../../../utils/Storage'
import { message } from 'antd'

class Profile extends Component {
  state = {
    content: <div></div>
  }

  roleId = Storage.get('roleId')

  componentDidMount () {
    switch (this.roleId) {
      case 'USER':
        this.setState({ content: <User /> })
        break
      case 'MANAGER':
        this.setState({ content: <Manager /> })
        break
      case 'DEVELOPER':
        this.setState({ content: <Developer /> })
        break
      default:
        message.error('没有你的角色信息')
        this.props.history.push('/')
    }
  }

  render () {
    const { content } = this.state
    return <Fragment>{content}</Fragment>
  }
}

Profile.propTypes = {
  history: PropTypes.object
}

export default Profile
