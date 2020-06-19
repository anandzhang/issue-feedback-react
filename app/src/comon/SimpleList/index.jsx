import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { List } from 'antd'

const { Item } = List

const SimpleList = ({ dataSource, itemName, linkIndex }) => {
  const renderItem = item => {
    return (
      <Item>
        {linkIndex
          ? (
            <Link to={`/feedback/${item[linkIndex]}`}>
              {item[itemName]}
            </Link>
          )
          : item[itemName]}
      </Item>
    )
  }

  return (
    <List
      dataSource={dataSource}
      renderItem={renderItem}
    />
  )
}

SimpleList.propTypes = {
  dataSource: PropTypes.array.isRequired,
  itemName: PropTypes.string.isRequired,
  linkIndex: PropTypes.string
}

export default SimpleList
