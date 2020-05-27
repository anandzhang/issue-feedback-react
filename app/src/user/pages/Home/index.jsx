import React, { Component, Fragment } from 'react'
import { Row, Col, Button, Card, message } from 'antd'
import Banner from '../../components/Banner'
import FeedbackList from '../../components/FeedbackList'
import FixedFeedbackList from '../../components/FixedFeedbackList'
import UserStatistic from '../../components/UserStatistic'
import AddModal from './AddModal'
import { requestFeedbackList, requestProductList } from '../../../api/base'
import './index.css'

class Home extends Component {
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
    return (
      <Fragment>
        <Banner />
        <div className='feedback-title'>最近反馈</div>
        <Row gutter={12}>
          <Col span={18}>
            <FeedbackList dataSource={feedback} />
          </Col>
          <Col span={6}>
            <Card className='margin-10'>
              <UserStatistic like={10} feedback={20} />
              <Button type='primary' className='feedback-btn' onClick={this.showAddModal}>反馈一下</Button>
            </Card>
            <FixedFeedbackList dataSource={fixed} />
          </Col>
        </Row>
        <AddModal ref={this.addModal} products={products} getFeedback={this.getFeedback} />
      </Fragment>
    )
  }
}

export default Home
