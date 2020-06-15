import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Table, Button, message } from 'antd'
import CardTitle from './CardTitle'
import columns from './columns'
import STATUS from '../../../constants/Status'
import { requestUpdateFeedbackStatus } from '../../../api/base'

const Feedback = props => {
  const { feedback } = props
  const [status, setStatus] = useState(STATUS.OPENING)
  const history = useHistory()

  const modifyFeedbackStatus = async (id, status) => {
    let msg = ''
    if (status === STATUS.OPENING) {
      status = STATUS.CLOSED
      msg = '关闭'
    } else {
      status = STATUS.OPENING
      msg = '开启'
    }
    try {
      await requestUpdateFeedbackStatus(id, status)
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
  feedback: PropTypes.object
}

export default connect(({ feedback }) => ({ feedback }))(Feedback)
