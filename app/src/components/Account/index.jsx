import React, { Component, Fragment } from 'react'
import { Modal, Form, Input, message, Button } from 'antd'
import PropTypes from 'prop-types'
import { requestRegister, requestLogin, requsetProfile } from '../../api/baseApi'
import Storage from '../../utils/Storage'
import './index.css'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'


class Account extends Component {
  constructor(props) {
    super(props)
    this.loginModal = React.createRef()
    this.registerModal = React.createRef()
  }

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

  showLoginModal = () => this.loginModal.current.changeVisible()

  showRegisterModal = () => this.registerModal.current.changeVisible()

  render() {
    return (
      <Fragment>
        <LoginModal ref={this.loginModal} showRegisterModal={this.showRegisterModal} />
        <RegisterModal ref={this.registerModal} showLoginModal={this.showLoginModal} />
      </Fragment>
    )
  }
}

Account.propTypes = {
  changeNickname: PropTypes.func
}

export default Account
