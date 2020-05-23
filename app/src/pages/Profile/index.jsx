import React, { Component } from 'react'
import User from './User'
import Manager from './Manager'
import Developer from './Developer'

class Profile extends Component {
  render () {
    return (
      <div>
        <User/>
        <Manager/>
        <Developer />
      </div>
    )
  }
}

export default Profile
