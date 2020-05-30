import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import User from './User'
import Manager from './Manager'
import Developer from './Developer'
import Storage from '../../../utils/Storage'
import { message } from 'antd'

const Profile = props => {
  const [content, setContent] = useState(<></>)
  const roleId = Storage.get('roleId')
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
  history: PropTypes.object
}

export default Profile
