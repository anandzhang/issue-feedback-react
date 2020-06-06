import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { List, Avatar, Space } from 'antd'

const { Item } = List
const { Meta } = Item

const getItemActions = (actions, item) => (
  actions.map(({ icon, textIndex }) => (
    <Space key={textIndex}>{icon}{item[textIndex]}</Space>
  ))
)

const MetaList = props => {
  const {
    dataSource,
    itemStyle,
    avatarSize = 'large',
    actions,
    titleHref,
    avatarIndex = 'avatar',
    titleIndex = 'title',
    descriptionIndex = 'description'
  } = props

  const renderItem = item => (
    <Item
      actions={actions && getItemActions(actions, item)}
      style={itemStyle}
    >
      <Meta
        avatar={
          <Avatar
            size={avatarSize}
            shape='square'
            src={item[avatarIndex] || '/images/avatar.jpg'}
            alt='avatar'
          />
        }
        title={
          <Link
            to={titleHref.length === 2
              ? `${titleHref[0]}/${item[titleHref[1]]}`
              : titleHref}
          >
            {item[titleIndex]}
          </Link>
        }
        description={item[descriptionIndex]}
      />
    </Item>
  )

  return (
    <List
      dataSource={dataSource}
      renderItem={renderItem}
    />
  )
}

MetaList.propTypes = {
  dataSource: PropTypes.array.isRequired,
  // List 列表每一项的样式
  itemStyle: PropTypes.object,
  // Meta 组件中头像的尺寸
  avatarSize: PropTypes.string,
  // List 列表每一项的 actions 配置
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element.isRequired,
      textIndex: PropTypes.string.isRequired
    })
  ),
  // 标题使用的链接
  titleHref: PropTypes.array,
  // Meta 组件中
  // 使用到的 title avatar(src) description 数据的键
  avatarIndex: PropTypes.string,
  titleIndex: PropTypes.string,
  descriptionIndex: PropTypes.string
}

export default MetaList
