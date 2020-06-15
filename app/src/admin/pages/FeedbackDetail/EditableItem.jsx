import React, { useState, useRef, useEffect } from 'react'
import { Form, Input } from 'antd'

const { Item, useForm } = Form

const EditableItem = ({ label, name, value, handleSave }) => {
  const input = useRef(null)
  const [form] = useForm()
  const [editing, setEditing] = useState(false)
  useEffect(() => {
    if (editing) {
      input.current.focus()
      form.setFieldsValue({
        [name]: value
      })
    }
  }, [editing])

  const save = values => {
    setEditing(false)
    handleSave(values)
  }

  const children = editing
    ? (
      <Form form={form} onFinish={save}>
        <Item name={name} rules={[{ required: true, message: `请输入${label}` }]} noStyle>
          <Input ref={input} onBlur={() => form.submit()} />
        </Item>
      </Form>
    )
    : (
      <div onClick={() => setEditing(true)}>
        {value}
      </div>
    )
  return children
}

export default EditableItem
