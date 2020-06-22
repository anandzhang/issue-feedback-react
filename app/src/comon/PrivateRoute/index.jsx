import React from 'react'
import { connect } from 'react-redux'
import { getProfile } from '../../actions'
import { Route, Redirect, useHistory } from 'react-router-dom'
import Storage from '../../utils/Storage'

const PrivateRoute = props => {
  const { profile, getProfile, children, ...rest } = props
  const { roleId } = profile
  const history = useHistory()

  const authenticate = () => {
    const userId = Storage.get('userId')
    if (userId) getProfile(userId)
    else history.push('/')
  }

  return (
    <Route {...rest} render={() => {
      if (!roleId) authenticate()
      else if (roleId === 'MANAGER') return children
      else return <Redirect to='/' />
    }} />
  )
}

export default connect(
  ({ profile }) => ({ profile }),
  { getProfile }
)(PrivateRoute)
