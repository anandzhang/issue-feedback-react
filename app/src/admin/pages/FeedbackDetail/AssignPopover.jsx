import React, { useState, useEffect } from 'react'
import { Popover, Checkbox, Space, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import {
  requestNotAssignedDeveloperList,
  requestAssignFeedback
} from '../../../api/base'

const AssignPopover = ({ id, assignedDevelopers, onFinish }) => {
  const [developers, setDevelopers] = useState([])
  useEffect(() => {
    getDevelopers()
  }, [])
  const changedDevelopers = []

  const getDevelopers = async () => {
    const { developers: notAssignedDevelopers } = await requestNotAssignedDeveloperList(id)
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

  const onVisibleChange = async visible => {
    if (!visible) {
      try {
        await requestAssignFeedback(id, changedDevelopers)
        message.success('修改成功')
        onFinish(developers.filter(({ user_id: id }) => changedDevelopers.find(changedId => id === changedId)))
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

export default AssignPopover
