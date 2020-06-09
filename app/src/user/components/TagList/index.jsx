import React from 'react'
import PropTypes from 'prop-types'
import { Tag, Popover } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Item from './Item'

const TagList = ({ tags }) => {
  const onChange = e => {

  }

  const content = tags.map(value => (
    <Item key={value.name} data={value} onChange={onChange} />
  ))

  return (
    <div style={stylesheet.tagsList}>
      标签：
      {tags.map(value => (
        <Tag key={value.name} color='success'>{value.name}</Tag>
      ))}
      <Popover
        placement='bottomRight'
        title='设置标签'
        content={content}
        trigger='click'
        style={stylesheet.popover}
      >
        <EditOutlined />
      </Popover>
    </div>
  )
}

const stylesheet = {
  tagsList: {
    margin: '12px 0'
  },
  popover: {
    width: 120
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
