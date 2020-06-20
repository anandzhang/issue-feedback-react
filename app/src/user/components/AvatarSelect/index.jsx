import React from 'react'
import PropTypes from 'prop-types'
import { Space, Avatar } from 'antd'

const AvatarSelect = props => {
  const { value, onChange, size = 'default', options = [] } = props

  const selectOption = e => {
    const selectedValue = e.currentTarget.dataset.value
    onChange(selectedValue)
  }

  return (
    <Space>
      {
        options.map(url => (
          <div
            key={url}
            onClick={selectOption}
            style={value === url ? stylesheet.active : null}
            data-value={url}
          >
            <Avatar size={size} src={url} />
          </div>
        ))
      }
    </Space>
  )
}

const stylesheet = {
  active: {
    padding: 5,
    border: '1px solid #1890ff',
    borderRadius: '50%',
    boxShadow: '0 0 2px 1px #40a9ff'
  }
}

AvatarSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  options: PropTypes.array
}

export default AvatarSelect
