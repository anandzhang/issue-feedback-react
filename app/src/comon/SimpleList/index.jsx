import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'

const { Item } = List

const SimpleList = ({ dataSource, itemName }) => {
  return (
    <List
      dataSource={dataSource}
      renderItem={item => <Item>{item[itemName]}</Item>}
    />
  )
}

SimpleList.propTypes = {
  dataSource: PropTypes.array.isRequired,
  itemName: PropTypes.string.isRequired
}

export default SimpleList
