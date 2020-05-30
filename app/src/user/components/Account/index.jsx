import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import './index.css'

const Account = props => {
  const { setNickname } = props
  const loginModal = useRef(null)
  const registerModal = useRef(null)

  const showLoginModal = () => {
    loginModal.current.changeVisible()
  }

  const showRegisterModal = () => {
    registerModal.current.changeVisible()
  }

  return (
    <>
      <LoginModal
        ref={loginModal}
        showRegisterModal={showRegisterModal}
        setNickname={setNickname}
      />
      <RegisterModal
        ref={registerModal}
        showLoginModal={showLoginModal}
      />
    </>
  )
}

Account.propTypes = {
  setNickname: PropTypes.func
}

export default Account
