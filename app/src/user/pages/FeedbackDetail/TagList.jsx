import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

const TagList = ({ tags }) => {
  return (
    <div style={stylesheet.tagsList}>
      标签：
      {tags.map(value => (
        <Tag key={value.name} color='success'>{value.name}</Tag>
      ))}
    </div>
  )
}

const stylesheet = {
  tagsList: {
    margin: '12px 0'
  }
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string
  })).isRequired
}

export default TagList
