import React from 'react'
import { Row, Col, Statistic } from 'antd'
import './index.css'

const UserStatistic = ({ like, feedback }) => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic
          title='被赞同'
          value={like}
          className='text-center'
        />
      </Col>
      <Col span={12}>
        <Statistic
          title='提出反馈'
          value={feedback}
          className='text-center'
        />
      </Col>
    </Row>
  )
}

export default UserStatistic
