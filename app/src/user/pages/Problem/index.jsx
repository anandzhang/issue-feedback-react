import React from 'react'
import data from '../../../admin/pages/Problem/data'
import { Card } from 'antd'

const Problem = () => {
  return (
    <>
      {data.map(({ key, name, content }) => (
        <Card
          key={key}
          title={name}
          style={{ margin: '20px 0' }}
        >
          {content}
        </Card>
      ))}
    </>
  )
}

export default Problem
