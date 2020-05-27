import React from 'react'
import { Space, message } from 'antd'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import { requestVoteFeedback } from '../../../api/base'

const getItemActions = id => {
  const likeIcon = React.createRef()
  const dislikeIcon = React.createRef()

  const voteFeedback = async opinion => {
    try {
      await requestVoteFeedback({ issue_id: id, opinion })
      if (opinion === 'like') likeIcon.current.classList.add('done')
      else dislikeIcon.current.classList.add('done')
      message.success('投票成功')
    } catch (err) {
      message.error(err)
    }
  }

  return [
    (
      <Space
        key='like'
        className='icon-like'
        onClick={() => voteFeedback('like')}
      >
        <LikeOutlined ref={likeIcon} />200
      </Space>
    ),
    (
      <Space
        key='dislike'
        className='icon-dislike'
        onClick={() => voteFeedback('dislike')}
      >
        <DislikeOutlined ref={dislikeIcon} />10
      </Space>
    )
  ]
}

export default getItemActions
