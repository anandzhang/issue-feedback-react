import React from 'react'
import PropTypes from 'prop-types'
import { Tag, Popover } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Item from './Item'

const TagList = ({ tags = [] }) => {
  const checkedTags = tags.reduce((pre, cur) => {
    const { name, checked } = cur
    if (checked) pre.push(name)
    return pre
  }, [])

  const onChange = (value, checked) => {
    if (checked) checkedTags.push(value)
    else {
      const index = checkedTags.findIndex(item => item.name === name)
      checkedTags.splice(index, 1)
    }
  }

  const onVisibleChange = visible => {
    if (!visible) {
      // console.log(checkedTags)
    }
  }

  const content = tags.map(value => (
    <Item key={value.name} data={value} onChange={onChange} />
  ))

  return (
    <div style={stylesheet.tagsList}>
      标签：
      {checkedTags.map(name => (
        <Tag key={name} color='success'>{name}</Tag>
      ))}
      <Popover
        placement='rightBottom'
        title='设置标签'
        content={content}
        trigger='click'
        onVisibleChange={onVisibleChange}
        overlayClassName='tag-list'
      >
        <EditOutlined />
      </Popover>
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
  }))
}

export default TagList
