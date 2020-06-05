import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { saveProducts, saveFeedback } from '../../../actions'
import { Row, Col, Button, Card, message } from 'antd'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'
import Banner from '../../components/Banner'
import UserStatistic from '../../components/UserStatistic'
import AddModal from './AddModal'
import { requestFeedbackList, requestProductList } from '../../../api/base'
import './index.css'
import SimpleList from '../../../comon/SimpleList'
import MetaList from '../../../comon/MetaList'
import styles from './stylesheet.module.css'

const Home = props => {
  const { products, feedback, saveProducts, saveFeedback } = props
  const addModal = React.useRef(null)
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
      saveProducts(products)
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
      saveFeedback({ status: 'opening', data: issues })
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
      saveFeedback({ status: 'closed', data: issues })
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
          <MetaList
            dataSource={feedback.opening}
            itemClassName={styles['feedback-list-item']}
            actions={[
              { icon: <LikeOutlined />, textIndex: 'likes' },
              // TODO: 后端暂无评论总数
              { icon: <MessageOutlined />, textIndex: 'comments' }
            ]}
            titleHref={['/feedback', 'issue_id']}
          />
        </Col>
        <Col span={6}>
          <Card className='margin-10'>
            <UserStatistic like={10} feedback={20} />
            <Button type='primary' className='feedback-btn' onClick={showAddModal}>反馈一下</Button>
          </Card>
          <Card title='最新动态'>
            <SimpleList dataSource={feedback.closed} itemName='title' />
          </Card>
        </Col>
      </Row>
      <AddModal ref={addModal} getFeedback={getFeedback} />
    </>
  )
}

Home.propTypes = {
  products: PropTypes.array,
  feedback: PropTypes.object,
  saveProducts: PropTypes.func,
  saveFeedback: PropTypes.func
}

export default connect(
  ({ products, feedback }) => ({ products, feedback }),
  { saveProducts, saveFeedback }
)(Home)
