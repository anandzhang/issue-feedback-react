import React, { Fragment } from 'react'
import { Row, Col, Button, Card } from 'antd'
import Banner from '../../components/Banner'
import FeedbackList from '../../components/FeedbackList'
import FixedFeedbackList from '../../components/FixedFeedbackList'
import UserStatistic from '../../components/UserStatistic'
import './index.css'

const dataSource = []

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <div className='feedback-title'>最近反馈</div>
      <Row gutter={12}>
        <Col span={18}>
          <FeedbackList dataSource={dataSource} />
        </Col>
        <Col span={6}>
          <Card className='margin-10'>
            <UserStatistic like={10} feedback={20} />
            <Button type='primary' className='feedback-btn'>反馈一下</Button>
          </Card>
          <FixedFeedbackList dataSource={dataSource} />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Home
