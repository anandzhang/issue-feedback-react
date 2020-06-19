import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'
import chinaDate from '../../../utils/chinaDate'
import { Link } from 'react-router-dom'

const { Item } = List

const FeedbackList = props => {
  const { dataSource } = props
  return (
    <List
      dataSource={dataSource}
      renderItem={item => (
        <Item>
          <Item.Meta
            title={(
              <Link to={`/feedback/${item.issue_id}`}>{item.title}</Link>
            )}
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
