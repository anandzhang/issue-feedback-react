import React from 'react'
import PropTypes from 'prop-types'
import { List, Avatar } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import getItemActions from './getItemActions'
import './index.css'

const { Item } = List
const { Meta } = Item

const FeedbackList = ({ dataSource }) => {
  const renderItem = item => {
    const { issue_id: id, title, description, created_at: time } = item
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
      <Item actions={getItemActions(id)} className='feedback-list-item'>
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

FeedbackList.propTypes = {
  dataSource: PropTypes.array
}

export default FeedbackList
