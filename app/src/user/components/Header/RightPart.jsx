import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, Button } from 'antd'
import Account from '../Account'
import DropdownMenu from './DropdownMenu'

const RightPart = ({ nickname }) => {
  const accountModal = React.useRef()

  const showLoginModal = () => {
    accountModal.current.showLoginModal()
  }

  return (
    <Col span={2} offset={16} style={stylesheet.login}>
      {
        nickname
          ? <DropdownMenu />
          : <Button type='link' onClick={showLoginModal}>登录</Button>
      }
      <Account ref={accountModal} />
    </Col>
  )
}

const stylesheet = {
  login: {
    lineHeight: '60px',
    textAlign: 'center'
  }
}

RightPart.propTypes = {
  nickname: PropTypes.string
}

export default connect(
  ({ profile }) => ({ nickname: profile.nickname })
)(RightPart)
