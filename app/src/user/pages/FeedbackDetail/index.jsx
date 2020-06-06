import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Card, Avatar, List, message } from 'antd'
import { requestFeedbackDetail, requestCommentList } from '../../../api/base'
import LeftPart from './LeftPart'
import RightPart from './RightPart'

const FeedbackDetail = props => {
  const { match, history } = props
  const [id, setId] = useState('')
  useEffect(() => {
    if (!match) history.push('/')
    else {
      const { id } = match.params
      setId(id)
    }
  }, [])

  return (
    <Row gutter={12} style={{ marginTop: 20 }}>
      <LeftPart id={id} />
      <RightPart />
    </Row>
  )
}

FeedbackDetail.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}

export default FeedbackDetail
