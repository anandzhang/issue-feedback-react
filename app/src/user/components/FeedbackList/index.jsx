import React from 'react'
import PropTypes from 'prop-types'
import { List, Avatar } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import getItemActions from './getItemActions'

import './index.css'

const { Item } = List
const { Meta } = Item

const FeedbackList = props => {
  const { status, dataSource } = props

  const renderItem = item => {
    if (status === 'opening') {
      const {
        issue_id: id,
        title,
        created_at: time,
        owner,
        likes,
        comments = 3
      } = item
      const { nickname } = owner
      const avatar = (
        <Avatar
          size='large'
          shape='square'
          // TODO: 后端暂无头像字段
          src='/images/avatar.jpg'
          alt='avatar'
        />
      )
      return (
        <Item
          actions={getItemActions(likes, comments)}
          className='feedback-list-item'
        >
          <Meta
            avatar={avatar}
            title={<a href={`/feedback/${id}`}>{title}</a>}
            description={
              `${nickname} 发表于 ${moment(time).locale('zh-cn').fromNow()}`
            }
          />
        </Item>
      )
    } else {
      return <Item>{item.title}</Item>
    }
  }

  return (
    <List
      dataSource={dataSource}
      renderItem={renderItem}
    />
  )
}

FeedbackList.propTypes = {
  status: PropTypes.string,
  dataSource: PropTypes.array
}

export default FeedbackList
