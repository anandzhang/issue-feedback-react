import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import User from './User'
import Manager from './Manager'
import Developer from './Developer'

const Profile = ({ roleId }) => (
  <>
    {roleId === 'USER'
      ? <User />
      : roleId === 'MANAGER'
        ? <Manager />
        : roleId === 'DEVELOPER'
          ? <Developer />
          : null}
  </>
)

Profile.propTypes = {
  roleId: PropTypes.string,
  history: PropTypes.object
}

export default connect(
  ({ profile }) => ({ roleId: profile.roleId })
)(Profile)
