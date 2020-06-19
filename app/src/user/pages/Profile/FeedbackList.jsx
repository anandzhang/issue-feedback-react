import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'
import chinaDate from '../../../utils/chinaDate'

const { Item } = List

const FeedbackList = props => {
  const { dataSource } = props
  return (
    <List
      dataSource={dataSource}
      renderItem={item => (
        <Item>
          <Item.Meta
            title={item.title}
            description={chinaDate(item.created_at).format('lll')}
          />
        </Item>
      )}
    />
  )
}

FeedbackList.propTypes = {
  dataSource: PropTypes.array
}

export default FeedbackList
