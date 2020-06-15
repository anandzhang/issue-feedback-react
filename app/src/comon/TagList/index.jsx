import React from 'react'
import PropTypes from 'prop-types'
import { Tag, Popover, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Item from './Item'
import { requestUpdateTags } from '../../api/base'

const TagList = ({ title, id, tags = [], style, onFinish }) => {
  const changedTags = []

  const onChange = value => {
    const index = changedTags.findIndex(item => item === value)
    if (index > -1) changedTags.splice(index, 1)
    else changedTags.push(value)
  }

  const onVisibleChange = async visible => {
    if (!visible) {
      try {
        await requestUpdateTags(id, changedTags)
        message.success('修改成功')
        if (onFinish) onFinish()
      } catch (err) {
        message.error(err)
      }
    }
  }

  const content = tags.map(value => (
    <Item key={value.name} data={value} onChange={onChange} />
  ))

  return (
    <div style={style}>
      {title ? `${title}：` : ''}
      {tags.map(({ name, color, checked }) => {
        if (checked) return <Tag key={name} color={color}>{name}</Tag>
      })}
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

TagList.propTypes = {
  id: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string
  })),
  getDetail: PropTypes.func
}

export default TagList
