import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import './index.css'

class Account extends Component {
  constructor (props) {
    super(props)
    this.loginModal = React.createRef()
    this.registerModal = React.createRef()
  }

  showLoginModal = () => this.loginModal.current.changeVisible()

  showRegisterModal = () => this.registerModal.current.changeVisible()

  render () {
    const { setNickname } = this.props
    return (
      <Fragment>
        <LoginModal ref={this.loginModal} showRegisterModal={this.showRegisterModal} setNickname={setNickname} />
        <RegisterModal ref={this.registerModal} showLoginModal={this.showLoginModal} />
      </Fragment>
    )
  }
}

Account.propTypes = {
  setNickname: PropTypes.func
}

export default Account
