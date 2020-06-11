import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react'
import PropTypes from 'prop-types'
import { Modal, Checkbox, Row, Col, message } from 'antd'
import {
  requestDeveloperList,
  requestAssignFeedback
} from '../../../api/base'

const AssignModal = forwardRef(function Component (props, ref) {
  const { feedbackId, assignedDevelopers } = props
  const [visible, setVisible] = useState(false)
  const [notAssignedDevelopers, setNotAssignedDevelopers] = useState([])
  const [developers, setDevelopers] = useState([])
  useEffect(() => {
    getNotAssignedDevelopers()
  }, [])
  useEffect(() => {
    formatDevelopers()
  }, [notAssignedDevelopers])
  useImperativeHandle(ref, () => ({ changeVisible }))
  const changedDevelopers = []

  const changeVisible = () => setVisible(!visible)

  const getNotAssignedDevelopers = async () => {
    const { developers } = await requestDeveloperList(feedbackId)
    setNotAssignedDevelopers(developers)
  }

  const formatDevelopers = () => {
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

  const assignFeedback = async () => {
    try {
      await requestAssignFeedback(feedbackId, changedDevelopers)
      message.success('修改成功')
      changeVisible()
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <Modal
      title='分配反馈'
      visible={visible}
      onOk={assignFeedback}
      okText='确定'
      onCancel={changeVisible}
      cancelText='取消'
    >
      <Row gutter={[0, 8]}>
        {
          developers.map(({ nickname, user_id: id, checked }) => (
            <Col span={12} key={id}>
              <Checkbox
                onChange={onChange}
                id={id}
                defaultChecked={checked}
              >
                {nickname}
              </Checkbox>
            </Col>
          ))
        }
      </Row>
    </Modal>
  )
})

AssignModal.propTypes = {
  feedbackId: PropTypes.string,
  assignedDevelopers: PropTypes.array
}

export default AssignModal
