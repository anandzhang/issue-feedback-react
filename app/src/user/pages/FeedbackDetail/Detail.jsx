import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar, message } from 'antd'
import { requestFeedbackDetail } from '../../../api/base'
import chinaDate from '../../../utils/chinaDate'
import StatusTag from './StatusTag'
import TagList from './TagList'

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
    tags = []
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
      <TagList tags={tags} />
      <p style={{ marginTop: 20 }}>{description}</p>
    </Card>
  )
}

const stylesheet = {
  status: {
    marginLeft: 8
  }
}

Detail.propTypes = {
  id: PropTypes.string
}

export default Detail
