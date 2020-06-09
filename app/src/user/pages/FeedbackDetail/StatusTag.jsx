import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'
import {
  ExclamationCircleOutlined,
  IssuesCloseOutlined
} from '@ant-design/icons'
import STATUS from '../../../constants/Status'

const icon = {
  [STATUS.OPENING]: <ExclamationCircleOutlined />,
  [STATUS.CLOSED]: <IssuesCloseOutlined />
}

const color = {
  [STATUS.OPENING]: '#2cbe4e',
  [STATUS.CLOSED]: '#cb2431'
}

const StatusTag = ({ type, style }) => (
  <Tag
    icon={icon[type]}
    color={color[type]}
    style={style}
  >
    {STATUS[type]}
  </Tag>
)

StatusTag.propTypes = {
  type: PropTypes.oneOf([
    STATUS.OPENING,
    STATUS.CLOSED
  ]),
  style: PropTypes.object
}

export default StatusTag
