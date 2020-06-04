import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import User from './User'
import Manager from './Manager'
import Developer from './Developer'
import { message } from 'antd'
import { connect } from 'react-redux'

const Profile = props => {
  const { roleId } = props
  const [content, setContent] = useState(<></>)
  useEffect(() => {
    switch (roleId) {
      case 'USER':
        setContent(<User />)
        break
      case 'MANAGER':
        setContent(<Manager />)
        break
      case 'DEVELOPER':
        setContent(<Developer />)
        break
      default:
        message.error('没有你的角色信息')
        props.history.push('/')
    }
  }, [])
  return <>{content}</>
}

Profile.propTypes = {
  roleId: PropTypes.string,
  history: PropTypes.object
}

export default connect(
  ({ profile }) => ({ roleId: profile.roleId })
)(withRouter(Profile))
