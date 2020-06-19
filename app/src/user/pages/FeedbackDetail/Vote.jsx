import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Space, message } from 'antd'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import { requestUserOpinion, requestVoteFeedback } from '../../../api/base'

const Vote = ({ id, likes: initLikes, dislikes: initDislikes }) => {
  const [opinion, setOpinion] = useState('')
  const [likes, setLikes] = useState(initLikes)
  const [dislikes, setDislikes] = useState(initDislikes)
  useEffect(() => {
    getFeedbackOpinion()
  }, [id])
  useEffect(() => {
    setLikes(initLikes)
    setDislikes(initDislikes)
  }, [initLikes, initDislikes])

  const getFeedbackOpinion = async () => {
    try {
      const { opinion } = await requestUserOpinion(id)
      setOpinion(opinion)
    } catch (err) {
      message.error(err)
    }
  }

  const handleVote = async newOpinion => {
    try {
      await requestVoteFeedback({
        issue_id: id,
        opinion: newOpinion
      })
      if (opinion === 'none') {
        message.success('投票成功')
        if (newOpinion === 'like') setLikes(likes + 1)
        if (newOpinion === 'dislike') setDislikes(dislikes + 1)
        setOpinion(newOpinion)
      } else {
        if (opinion === newOpinion) {
          message.success('取消投票成功')
          if (newOpinion === 'like') setLikes(likes - 1)
          else setDislikes(dislikes - 1)
          setOpinion('none')
        } else {
          message.success('修改投票成功')
          if (newOpinion === 'like') {
            setLikes(likes + 1)
            setDislikes(dislikes - 1)
          } else {
            setLikes(likes - 1)
            setDislikes(dislikes + 1)
          }
          setOpinion(newOpinion)
        }
      }
    } catch (err) {
      message.error('' + err)
    }
  }

  return (
    <Space>
      <Space
        className={`opinion-like ${opinion === 'like' ? 'active' : null}`}
        onClick={() => handleVote('like')}
      >
        <LikeOutlined />{likes}
      </Space>
      <Space
        className={`opinion-dislike ${opinion === 'dislike' ? 'active' : null}`}
        onClick={() => handleVote('dislike')}
      >
        <DislikeOutlined />{dislikes}
      </Space>
    </Space>
  )
}

Vote.propTypes = {
  id: PropTypes.string,
  likes: PropTypes.number,
  dislikes: PropTypes.number
}

export default Vote
