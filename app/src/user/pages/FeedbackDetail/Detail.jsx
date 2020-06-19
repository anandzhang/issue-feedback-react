import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar, message, Space } from 'antd'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import { requestFeedbackDetail, requestUserOpinion, requestVoteFeedback } from '../../../api/base'
import chinaDate from '../../../utils/chinaDate'
import StatusTag from './StatusTag'
import TagList from '../../../comon/TagList'
import './Detail.css'

const Detail = ({ id }) => {
  const [detail, setDetail] = useState({})
  const [opinion, setOpinion] = useState('')
  useEffect(() => {
    if (id) {
      getDetail()
      getFeedbackOpinion()
    }
  }, [id])

  const getDetail = async () => {
    try {
      const result = await requestFeedbackDetail(id)
      setDetail(result)
    } catch (err) {
      message.error(err)
    }
  }

  const getFeedbackOpinion = async () => {
    try {
      const { opinion } = await requestUserOpinion(id)
      setOpinion(opinion)
    } catch (err) {
      message.error(err)
    }
  }

  const handleVote = async (currentTarget, opinion) => {
    try {
      await requestVoteFeedback({
        issue_id: id,
        opinion
      })
      currentTarget.classList.add('active')
      message.success('投票成功')
    } catch (err) {
      message.error('' + err)
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
      <Space>
        <Space className='opinion-like' onClick={({ currentTarget }) => handleVote(currentTarget, 'like')}><LikeOutlined />{likes}</Space>
        <Space className='opinion-dislike' onClick={({ currentTarget }) => handleVote(currentTarget, 'dislike')}><DislikeOutlined />{dislikes}</Space>
      </Space>
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
