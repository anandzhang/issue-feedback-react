import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Card, Avatar, List, message } from 'antd'
import Detail from './Detail'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { requestFeedbackDetail, requestCommentList } from '../../../api/base'

const FeedbackDetail = props => {
  const { match, history, openingFeedback } = props
  const [id, setId] = useState('')
  const [detail, setDetail] = useState({})
  const [comments, setComments] = useState([])
  useEffect(() => {
    if (!match) history.push('/')
    else {
      const { id } = match.params
      setId(id)
      getFeedbackDetail(id)
      getCommentList(id)
    }
  }, [])

  const getFeedbackDetail = async id => {
    try {
      const result = await requestFeedbackDetail(id)
      setDetail(result)
    } catch (err) {
      message.error(err)
    }
  }

  const getCommentList = async id => {
    try {
      const { comments } = await requestCommentList(id)
      setComments(comments)
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <Row gutter={12} style={{ marginTop: 20 }}>
      <Col span={18}>
        <Detail data={detail} />
        <Card
          title='评论'
          style={{ marginTop: 12 }}
          headStyle={{ border: 'none' }}
        >
          <CommentList comments={comments} />
          <Card.Meta
            avatar={
              <Avatar
                size='large'
                shape='square'
                src='/images/avatar.jpg'
              />
            }
            title={<CommentForm id={id} getCommentList={getCommentList} />}
            style={{ marginTop: 20 }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card title='其他反馈'>
          <List
            dataSource={openingFeedback}
            renderItem={item => <List.Item>{item.title}</List.Item>}
          />
        </Card>
      </Col>
    </Row>
  )
}

FeedbackDetail.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  openingFeedback: PropTypes.array
}

export default connect(
  ({ feedback }) => ({ openingFeedback: feedback.opening })
)(FeedbackDetail)
