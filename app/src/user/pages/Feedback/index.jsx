import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Banner from '../../components/Banner'
import FeedbackList from '../../components/FeedbackList'

class Feedback extends Component {
  render () {
    // console.log(this.props.location)

    return (
      <div>
        <Banner />
        <FeedbackList />
      </div>
    )
  }
}

export default Feedback
