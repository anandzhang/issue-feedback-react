import React from 'react'
import { Form } from 'antd'

const { useForm } = Form

const EditableRow = ({ EditableContext, ...restProps }) => {
  const [form] = useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...restProps} />
      </EditableContext.Provider>
    </Form>
  )
}

export default EditableRow
