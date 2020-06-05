import React from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar } from 'antd'

const Detail = props => {
  const {
    title,
    description,
    // status,
    created_at: createTime,
    // updated_at: updateTime,
    owner
  } = props.data
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
        title={title}
        description={`${nickname} 发布于 ${createTime}`}
      />
      <p style={{ marginTop: 20 }}>{description}</p>
    </Card>
  )
}

Detail.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
    owner: PropTypes.object
  })
}

export default Detail
