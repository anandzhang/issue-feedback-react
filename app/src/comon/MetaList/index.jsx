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
    header,
    avatarSize = 'large',
    actions,
    titleHref,
    avatarIndex = 'avatar',
    titleIndex = 'title',
    descriptionIndex = 'description',
    descriptionRender
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
            // TODO: avatar field need fix
            src={item.owner[avatarIndex] || '/images/avatar1.jpg'}
            alt='avatar'
          />
        }
        title={
          titleHref
            ? <Link
              to={titleHref.length === 2
                ? `${titleHref[0]}/${item[titleHref[1]]}`
                : item[titleHref[0]]}
            >
              {item[titleIndex]}
            </Link>
            : item[titleIndex]
        }
        description={
          descriptionRender
            ? descriptionRender(item)
            : item[descriptionIndex]
        }
      />
    </Item>
  )

  return (
    <List
      header={header}
      dataSource={dataSource}
      renderItem={renderItem}
    />
  )
}

MetaList.propTypes = {
  dataSource: PropTypes.array.isRequired,
  // List 列表每一项的样式
  itemStyle: PropTypes.object,
  // List header
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  // Meta 组件中头像的尺寸
  avatarSize: PropTypes.string,
  // List 列表每一项的 actions 配置
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element.isRequired,
      textIndex: PropTypes.string.isRequired
    })
  ),
  // 标题使用的链接 ['/home'?, 'href']
  // href 为列表每项中存链接的属性名
  titleHref: PropTypes.array,
  // Meta 组件中
  // 使用到的 title avatar(src) description 数据的属性名
  avatarIndex: PropTypes.string,
  titleIndex: PropTypes.string,
  descriptionIndex: PropTypes.string,
  // 传入方法进行自定义渲染
  descriptionRender: PropTypes.func
}

export default MetaList
