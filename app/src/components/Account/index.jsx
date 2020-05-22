import React, { Component,Fragment } from 'react'
import { Modal, Form, Input, message, Button } from 'antd'
import PropTypes from 'prop-types'
import { requestRegister, requestLogin, requsetProfile } from '../../api/baseApi'
import Storage from '../../utils/Storage'
import './index.css'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'


class Account extends Component {
  getProfile = async () => {
    try {
      const { ok, message: msg, result } = await requsetProfile()
      if (ok) {
        const { nickname } = result
        this.props.changeNickname(nickname)
      } else {
        message.error(msg)
      }
    } catch (err) { }
  }

  render() {
    return (
      <Fragment>
        <LoginModal />
        <RegisterModal />
      </Fragment>
    )
  }
}

Account.propTypes = {
  changeNickname: PropTypes.func
}

export default Account
