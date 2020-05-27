import React, { Component } from 'react'
import { Card, Row, Col, Button, List, Statistic, message } from 'antd'
import PropTypes from 'prop-types'
import './index.css'
// import { requestFeedbackList, requestProductList } from '../../api/base'
import AddModal from './AddModal'

class FeedbackList22 extends Component {
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
          // TODO: 暂取第一个产品进行反馈数据渲染
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
          // TODO: 暂取第一个产品进行反馈数据渲染
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

  render () {
    const { products, feedback, fixed } = this.state
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
          <Col span={18}>
            <FeedbackList2 dataSource={feedback} />
          </Col>
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
        <AddModal ref={this.addModal} products={products} getFeedback={this.getFeedback} />
      </div>
    )
  }
}

FeedbackList22.propTypes = {
  nickname: PropTypes.string
}

export default FeedbackList22
