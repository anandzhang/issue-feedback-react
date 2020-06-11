import React, { useState, useEffect, useContext, useRef } from 'react'
import { Form, Input, message } from 'antd'
import { requestUpdateProduct } from '../../../api/base'

const { Item } = Form

const EditableCell = props => {
  let {
    EditableContext,
    title,
    dataIndex,
    editable,
    children,
    record, // 这是 dataSource 中的数据项
    ...restProps
  } = props
  const [editing, setEditing] = useState(false)
  const input = useRef(null)
  const form = useContext(EditableContext)
  useEffect(() => {
    if (editing) input.current.focus()
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()
      const result = await requestUpdateProduct(record.product_id, values)
      console.log(result)
      record = {}
      toggleEdit()
    } catch { }
  }

  let childNode = children

  if (editable) {
    childNode = editing
      ? (
        <Item name={dataIndex} rules={[{ required: true, message: `请输入${title}` }]}>
          <Input ref={input} onPressEnter={save} onBlur={save} />
        </Item>
      )
      : (
        <div style={{ display: 'inline' }} onClick={toggleEdit}>{children}</div>
      )
  }

  return <td {...restProps}>{childNode}</td>
}

export default EditableCell
