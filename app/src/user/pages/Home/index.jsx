import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, message } from 'antd'
import Banner from '../../components/Banner'
import FeedbackList from '../../components/FeedbackList'
import FixedFeedbackList from '../../components/FixedFeedbackList'
import UserStatistic from '../../components/UserStatistic'
import AddModal from './AddModal'
import { requestFeedbackList, requestProductList } from '../../../api/base'
import './index.css'

const Home = () => {
  const addModal = React.useRef(null)
  const [products, setProducts] = useState([])
  const [feedback, setFeedback] = useState([])
  const [fixed, setFixed] = useState([])
  useEffect(() => {
    getProducts()
  }, [])
  useEffect(() => {
    if (products.length !== 0) {
      const { product_id: productId } = products[0]
      getFeedback(productId)
      getFixed(productId)
    }
  }, [products])

  const getProducts = async () => {
    try {
      const { products } = await requestProductList()
      setProducts(products)
    } catch (err) {
      message.error(err)
    }
  }

  const getFeedback = async productId => {
    try {
      const { issues } = await requestFeedbackList({
        product_id: productId,
        status: 'opening'
      })
      setFeedback(issues)
    } catch (err) {
      message.error(err)
    }
  }

  const getFixed = async productId => {
    try {
      const { issues } = await requestFeedbackList({
        product_id: productId,
        status: 'closed'
      })
      setFixed(issues)
    } catch (err) {
      message.error(err)
    }
  }

  const showAddModal = () => {
    addModal.current.changeVisible()
  }

  return (
    <>
      <Banner />
      <div className='feedback-title'>最近反馈</div>
      <Row gutter={12}>
        <Col span={18}>
          <FeedbackList dataSource={feedback} />
        </Col>
        <Col span={6}>
          <Card className='margin-10'>
            <UserStatistic like={10} feedback={20} />
            <Button type='primary' className='feedback-btn' onClick={showAddModal}>反馈一下</Button>
          </Card>
          <FixedFeedbackList dataSource={fixed} />
        </Col>
      </Row>
      <AddModal ref={addModal} products={products} getFeedback={getFeedback} />
    </>
  )
}

export default Home
