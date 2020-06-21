import React, { useState, useRef, useEffect } from 'react'
import { Form, Input } from 'antd'

const { Item, useForm } = Form

const EditableItem = ({ label, name, value, handleSave, mode }) => {
  const item = useRef(null)
  const [form] = useForm()
  const [editing, setEditing] = useState(false)
  useEffect(() => {
    if (editing) {
      item.current.focus()
      form.setFieldsValue({
        [name]: value
      })
    }
  }, [editing])

  const save = value => {
    setEditing(false)
    handleSave(value)
  }

  const children = editing
    ? (
      <Form form={form} onFinish={save}>
        <Item
          name={name}
          rules={[{ required: true, message: `请输入${label}` }]}
          style={{ margin: 0 }}
        >
          {mode === 'TextArea'
            ? <Input.TextArea
              ref={item}
              rows={6}
              cols={80}
              onBlur={() => form.submit()}
              style={{ verticalAlign: 'top' }}
            />
            : <Input ref={item} onBlur={() => form.submit()} />}
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
