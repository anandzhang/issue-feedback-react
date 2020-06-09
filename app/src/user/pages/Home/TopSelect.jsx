import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFeedback } from '../../../actions'
import { Select } from 'antd'

const { Option } = Select

const TopSelect = ({ products, getFeedback }) => {
  const [value, setValue] = useState('')

  const onChange = value => {
    setValue(value)
    getFeedback(value, 'opening')
    getFeedback(value, 'closed')
  }

  return (
    <>
      <span >最近反馈</span>
      <Select
        value={value || (products[0] && products[0].product_id)}
        onChange={onChange}
        style={stylesheet.select}
      >
        {
          products.map(({ product_id: id, name }) => (
            <Option key={id} value={id}>{name}</Option>
          ))
        }
      </Select>
    </>
  )
}

const stylesheet = {
  select: {
    width: 100,
    marginLeft: 10
  }
}

TopSelect.propTypes = {
  products: PropTypes.array,
  getFeedback: PropTypes.func
}

export default connect(
  ({ products }) => ({ products }),
  { getFeedback }
)(TopSelect)
