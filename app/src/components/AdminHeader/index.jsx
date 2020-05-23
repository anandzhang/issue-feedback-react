import React, { Component } from 'react'
import { Avatar, Row, Col } from 'antd'

class Header extends Component {
  render () {
    return (
      <Row justify='end' style={{ backgroundColor: '#fff', padding: 8 }}>
        <Col>
          <Avatar
            size='large'
            src='https://anand-app.oss-cn-beijing.aliyuncs.com/avatar/2.jpg'
            alt='avatar'
          />
        </Col>
      </Row>
    )
  }
}

export default Header
