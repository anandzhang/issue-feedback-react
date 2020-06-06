import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfile } from '../../../actions'
import { Row } from 'antd'
import Storage from '../../../utils/Storage'
import LeftPart from './LeftPart'
import RightPart from './RightPart'

const Header = ({ getProfile }) => {
  useEffect(() => {
    const userId = Storage.get('userId')
    userId && getProfile(userId)
  }, [])

  return (
    <Row style={stylesheet.header}>
      <LeftPart />
      <RightPart />
    </Row>
  )
}

const stylesheet = {
  header: {
    backgroundColor: '#fff'
  }
}

Header.propTypes = {
  getProfile: PropTypes.func
}

export default connect(null, { getProfile })(Header)
