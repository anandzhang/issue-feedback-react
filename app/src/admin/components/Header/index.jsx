import React from 'react'
import { Row, Col } from 'antd'
import DropdownMenu from './DropdownMenu'

const Header = () => {
  return (
    <Row justify='end' style={stylesheet.header}>
      <Col><DropdownMenu /></Col>
    </Row>
  )
}

const stylesheet = {
  header: {
    backgroundColor: '#fff',
    padding: '8px 20px'
  }
}

export default Header
