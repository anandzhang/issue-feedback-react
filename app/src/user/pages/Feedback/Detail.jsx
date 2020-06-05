import React from 'react'
import { Card, Avatar } from 'antd'

const Detail = () => {
  return (
    <Card>
      <Card.Meta
        avatar={
          <Avatar
            size={50}
            shape='square'
            src='/images/avatar.jpg'
          />
        }
        title='dasda'
        description='dsads'
      />
      <p style={{ marginTop: 20 }}>dsajldajslkdjklajd</p>
    </Card>
  )
}

export default Detail
