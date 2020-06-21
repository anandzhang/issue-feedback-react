import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Popover, Checkbox, Space, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import {
  requestNotAssignedDeveloperList,
  requestAssignFeedback
} from '../../../api/base'

const AssignPopover = props => {
  const { id, assignedDevelopers = [], onFinish } = props
  const [developers, setDevelopers] = useState([])
  useEffect(() => {
    getDevelopers()
  }, [])
  const changedDevelopers = []

  const getDevelopers = async () => {
    const {
      developers: notAssignedDevelopers
    } = await requestNotAssignedDeveloperList(id)
    const checked = assignedDevelopers.reduce((pre, cur) => {
      pre.push({
        ...cur,
        checked: true
      })
      return pre
    }, [])
    setDevelopers(checked.concat(notAssignedDevelopers))
  }

  const onChange = e => {
    const { id } = e.target
    const index = changedDevelopers.findIndex(item => item === id)
    if (index > -1) changedDevelopers.splice(index, 1)
    else changedDevelopers.push(id)
  }

  const filterFinishResult = () => (
    developers.filter(({ user_id: id }) => (
      changedDevelopers.find(changedId => id === changedId)
    ))
  )

  const onVisibleChange = async visible => {
    if (!visible) {
      try {
        await requestAssignFeedback(id, changedDevelopers)
        message.success('修改成功')
        onFinish(filterFinishResult())
      } catch (err) {
        message.error(err)
      }
    }
  }

  const content = (
    <Space direction='vertical'>
      {developers.map(({ nickname, user_id: id, checked }) => (
        <Checkbox
          key={id}
          onChange={onChange}
          id={id}
          defaultChecked={checked}
        >
          {nickname}
        </Checkbox>
      ))}
    </Space>
  )

  return (
    <Popover
      placement='rightTop'
      title='设置标签'
      content={content}
      trigger='click'
      onVisibleChange={onVisibleChange}
    >
      <EditOutlined />
    </Popover>
  )
}

AssignPopover.propTypes = {
  id: PropTypes.string.isRequired,
  assignedDevelopers: PropTypes.array.isRequired,
  onFinish: PropTypes.func.isRequired
}

export default AssignPopover
