import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveFeedback } from '../../../actions'
import { Card, Table, Button, message } from 'antd'
import CardTitle from './CardTitle'
import columns from './columns'
import STATUS from '../../../constants/Status'
import { requestUpdateFeedbackStatus } from '../../../api/base'

const Feedback = props => {
  const { feedback, saveFeedback } = props
  const [status, setStatus] = useState(STATUS.OPENING)
  const history = useHistory()

  const modifyFeedbackStatus = async (id, status) => {
    let newStatus = ''
    let msg = ''
    if (status === STATUS.OPENING) {
      newStatus = STATUS.CLOSED
      msg = '关闭'
    } else {
      newStatus = STATUS.OPENING
      msg = '开启'
    }
    try {
      await requestUpdateFeedbackStatus(id, newStatus)
      // 修改状态库中数据 避免再次请求反馈列表
      const newFeedback = [...feedback[status]]
      const index = newFeedback.findIndex(item => item.issue_id === id)
      newFeedback.splice(index, 1)
      saveFeedback({ status, data: newFeedback })
      message.success(`${msg}成功`)
    } catch {
      message.error(`${msg}失败`)
    }
  }

  // 添加自定义操作列
  const newColumns = [...columns]
  newColumns.push({
    title: '操作',
    /* eslint-disable react/display-name, react/prop-types */
    render: feedback => {
      const {
        issue_id: feedbackId,
        status
      } = feedback
      return (
        <>
          <Button
            type='link'
            onClick={() => modifyFeedbackStatus(feedbackId, status)}
          >
            {status === STATUS.OPENING ? '关闭' : '开启'}
          </Button>
          <Button
            type='link'
            onClick={() => history.push('/admin/manage/feedback/detail', { feedback })}
          >
            详情
          </Button>
        </>
      )
    }
  })

  return (
    <Card
      title={<CardTitle status={status} setStatus={setStatus} />}
    >
      <Table
        dataSource={feedback[status]}
        columns={newColumns}
        rowKey='issue_id'
      />
    </Card>
  )
}

Feedback.propTypes = {
  feedback: PropTypes.object,
  saveFeedback: PropTypes.func
}

export default connect(
  ({ feedback }) => ({ feedback }),
  { saveFeedback }
)(Feedback)
