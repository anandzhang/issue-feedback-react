import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import './index.css'

const Account = forwardRef(function Component (props, ref) {
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
      />
      <RegisterModal
        ref={registerModal}
        showLoginModal={showLoginModal}
      />
    </>
  )
})

export default Account
