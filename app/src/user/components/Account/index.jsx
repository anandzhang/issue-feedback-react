import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import './index.css'

const Account = (props, ref) => {
  const { setNickname } = props
  const loginModal = useRef(null)
  const registerModal = useRef(null)
  useImperativeHandle(ref, () => ({ showLoginModal }))

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

export default forwardRef(Account)
