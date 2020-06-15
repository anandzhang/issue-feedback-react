import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CheckOutlined } from '@ant-design/icons'

const Item = ({ data, onChange }) => {
  const { name, description, color = '#eee', checked: initChecked } = data
  const [checked, setChecked] = useState(initChecked)

  const changeChecked = e => {
    onChange(e.target.dataset.value)
    setChecked(!checked)
  }

  return (
    <div
      data-value={name}
      onClick={changeChecked}
      className='hover-bg clearfix'
      style={stylesheet.item}
    >
      <div style={stylesheet.checkedIcon} >
        <CheckOutlined color={color} style={stylesheet[checked]} />
      </div>
      <div style={stylesheet.textArea} >
        <div className='clearfix'>
          <div style={stylesheet.colorWrapper(color)}></div>
          <div style={stylesheet.name}>{name}</div>
        </div>
        <div>{description}</div>
      </div>
    </div>
  )
}

const stylesheet = {
  item: {
    padding: '12px 16px',
    cursor: 'pointer'
  },
  checkedIcon: {
    float: 'left',
    lineHeight: 2,
    pointerEvents: 'none'
  },
  textArea: {
    float: 'left',
    marginLeft: 10,
    pointerEvents: 'none'
  },
  colorWrapper: color => ({
    float: 'left',
    width: 14,
    height: 14,
    backgroundColor: color
  }),
  name: {
    float: 'left',
    marginLeft: 4,
    fontWeight: 'bold',
    lineHeight: 1
  },
  true: {
    opacity: 1
  },
  false: {
    opacity: 0
  }
}

Item.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string,
    checked: PropTypes.bool
  }),
  onChange: PropTypes.func
}

export default Item
