import React from 'react'
import PropTypes from 'prop-types'
import { List, Avatar, Space } from 'antd'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import moment from 'moment'
import 'moment/locale/zh-cn'
import './index.css'

const { Item } = List
const { Meta } = Item

const FeedbackList2 = ({ dataSource }) => {
  const actions = [
    <Space key='like'><LikeOutlined />200</Space>,
    <Space key='dislike'><DislikeOutlined />10</Space>
  ]

  const renderItem = item => {
    const { title, description, created_at: time } = item
    const avatar = (
      <Avatar
        size='large'
        shape='square'
        // TODO: 后端暂无头像字段
        src='https://anand-app.oss-cn-beijing.aliyuncs.com/avatar/1.jpg'
        alt='avatar'
      />
    )
    return (
      <Item actions={actions} className='feedback-list-item'>
        <Meta
          avatar={avatar}
          title={title}
          description={moment(time).locale('zh-cn').fromNow()}
        />
        {description}
      </Item>
    )
  }

  return (
    <List
      itemLayout='vertical'
      dataSource={dataSource}
      renderItem={renderItem}
    />
  )
}

FeedbackList2.propTypes = {
  dataSource: PropTypes.array
}

export default FeedbackList2
