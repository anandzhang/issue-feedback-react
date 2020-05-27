import React from 'react'
import PropTypes from 'prop-types'
import { Card, List } from 'antd'

const { Item } = List

const FixedFeedbackList = ({ dataSource }) => {
  return (
    <Card title='最新动态'>
      <List
        dataSource={dataSource}
        renderItem={item => <Item>{item.title}</Item>}
      />
    </Card>
  )
}

FixedFeedbackList.propTypes = {
  dataSource: PropTypes.array
}

export default FixedFeedbackList
