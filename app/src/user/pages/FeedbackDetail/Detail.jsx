import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar, message } from 'antd'
import { requestFeedbackDetail } from '../../../api/base'
import chinaDate from '../../../utils/chinaDate'
import StatusTag from './StatusTag'
import TagList from '../../../comon/TagList'
import Vote from './Vote'
import './Detail.css'

const Detail = ({ id }) => {
  const [detail, setDetail] = useState({})
  useEffect(() => {
    if (id) getDetail()
  }, [id])

  const getDetail = async () => {
    try {
      const result = await requestFeedbackDetail(id)
      setDetail(result)
    } catch (err) {
      message.error(err)
    }
  }

  const {
    title,
    description,
    status,
    created_at: createTime,
    // updated_at: updateTime,
    owner,
    tags,
    likes,
    dislikes
  } = detail
  const { nickname } = owner || {}

  return (
    <Card>
      <Card.Meta
        avatar={
          <Avatar
            size={50}
            shape='square'
            src='/images/avatar.jpg'
          />
        }
        title={(
          <>{title}<StatusTag type={status} style={stylesheet.status} /></>
        )}
        description={`${nickname} 发布于 ${chinaDate(createTime).fromNow()}`}
      />
      <TagList
        title='标签'
        id={id}
        tags={tags}
        style={stylesheet.tagsList}
        onFinish={getDetail}
      />
      <p style={{ margin: '20px 0' }}>{description}</p>
      <Vote id={id} likes={likes} dislikes={dislikes} />
    </Card>
  )
}

const stylesheet = {
  status: {
    marginLeft: 8
  },
  tagsList: {
    margin: '12px 0'
  }
}

Detail.propTypes = {
  id: PropTypes.string
}

export default Detail
