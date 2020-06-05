import React from 'react'
import PropTypes from 'prop-types'
import { List, Avatar } from 'antd'
import { Link } from 'react-router-dom'

const { Item } = List
const { Meta } = Item

const MetaList = props => {
  const {
    dataSource,
    itemStyle,
    itemClassName,
    avatarSize = 'large',
    actions,
    titleHref,
    avatarIndex = 'avatar',
    titleIndex = 'title',
    descriptionIndex = 'description'
  } = props

  const renderItem = item => (
    <Item
      actions={actions}
      style={itemStyle}
      className={itemClassName}
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
  itemStyle: PropTypes.object,
  itemClassName: PropTypes.string,
  avatarSize: PropTypes.string,
  actions: PropTypes.array,
  titleHref: PropTypes.array,
  avatarIndex: PropTypes.string,
  titleIndex: PropTypes.string,
  descriptionIndex: PropTypes.string
}

export default MetaList
