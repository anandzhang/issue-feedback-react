import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Statistic } from 'antd'

const CenterStatistic = ({ dataSource = [], style }) => {
  const getItem = () => dataSource.map(({ title, value }) => (
    <Col flex={1} key={title}>
      <Statistic
        title={title}
        value={value}
        className='text-center'
      />
    </Col>
  ))

  const cols = getItem()
  return <Row gutter={16} style={style}>{cols}</Row>
}

CenterStatistic.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  })).isRequired,
  style: PropTypes.object
}

export default CenterStatistic
