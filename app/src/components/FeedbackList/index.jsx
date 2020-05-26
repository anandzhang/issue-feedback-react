import React, { Component } from 'react'
import { Card, Avatar, Row, Col, Button, List, Statistic, message } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/zh-cn'
import './index.css'
import { requestFeedbackList, requestProductList } from '../../api/base'
import AddModal from './AddModal'

const { Meta } = Card

class FeedbackList extends Component {
  constructor (props) {
    super(props)
    this.addModal = React.createRef()
    this.state = {
      products: [],
      feedback: [],
      fixed: []
    }
  }

  getProducts = async () => {
    try {
      const { products } = await requestProductList()
      this.setState({ products }, () => {
        this.getFeedback()
        this.getFixed()
      })
    } catch (err) {
      message.error(err)
    }
  }

  getFeedback = async () => {
    const { products } = this.state
    if (products.length !== 0) {
      try {
        const { issues } = await requestFeedbackList({
          product_id: products[0].product_id,
          status: 'opening'
        })
        this.setState({ feedback: issues })
      } catch (err) {
        message.error(err)
      }
    } else {
      message.error('没有任何产品')
    }
  }

  getFixed = async () => {
    const { products } = this.state
    if (products.length !== 0) {
      try {
        const { issues } = await requestFeedbackList({
          product_id: products[0].product_id,
          status: 'closed'
        })
        this.setState({ fixed: issues })
      } catch (err) {
        message.error(err)
      }
    } else {
      message.error('没有任何产品')
    }
  }

  showAddModal = () => {
    this.addModal.current.changeVisible()
  }

  componentDidMount () {
    this.getProducts()
  }

  renderFeedback = () => {
    const { feedback } = this.state
    return feedback.map(value => {
      const { issue_id: id, title, description, created_at: time } = value
      const avatar = (
        <Avatar
          shape='square'
          size='large'
          // TODO: 后端暂无头像字段
          src='https://anand-app.oss-cn-beijing.aliyuncs.com/avatar/1.jpg'
          alt='avatar'
        />
      )
      return (
        <Card key={id} className='feedback-item'>
          <Meta
            avatar={avatar}
            title={title}
            description={description}
          />
          {moment(time).locale('zh-cn').fromNow()}
        </Card>
      )
    })
  }

  render () {
    const { products, fixed } = this.state
    const { nickname } = this.props
    const statistic = (
      <Row gutter={16}>
        <Col span={12}><Statistic title='被赞同' value={111} className='text-center' /></Col>
        <Col span={12}><Statistic title='提出反馈' value={4} className='text-center' /></Col>
      </Row>
    )
    return (
      <div>
        <div className='feedback-title'>最近反馈</div>
        <Row gutter={12}>
          <Col span={18}>{this.renderFeedback()}</Col>
          <Col span={6}>
            <Card className='margin-t-10'>
              {nickname ? statistic : ''}
              <Button type='primary' className='feedback-btn' onClick={this.showAddModal}>反馈一下</Button>
            </Card>
            <Card title='最新动态' className='margin-t-10'>
              <List
                dataSource={fixed}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </Card>
          </Col>
        </Row>
        <AddModal ref={this.addModal} products={products} />
      </div>
    )
  }
}

FeedbackList.propTypes = {
  nickname: PropTypes.string
}

export default FeedbackList
