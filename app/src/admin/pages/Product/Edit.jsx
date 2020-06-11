import React, { useState, useRef, useContext, useEffect } from 'react'
import { Table, Form, Input, message } from 'antd'
import data from './data'
import columns from './columns'
import { requestUpdateProduct } from '../../../api/base'

const EditableContext = React.createContext()

const EditableRow = props => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableCell = (props, e) => {
  const {
    title,
    dataIndex,
    editable,
    children,
    record, // 这是 dataSource 中的数据项
    handleSave,
    ...restprops
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
      toggleEdit()
    } catch (err) {
      message.error(err)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing
      ? (
        <Form.Item name={dataIndex}>
          <Input ref={input} onPressEnter={save} onBlur={save} />
        </Form.Item>
      )
      : (
        <div style={{ display: 'inline' }} onClick={toggleEdit}>{children}</div>
      )
  }

  return <td {...restprops}>{childNode}</td>
}

const Edit = () => {
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }

  const newColumns = columns.map(col => {
    if (!col.editable) return col
    return {
      ...col,
      onCell: record => {
        return {
          record,
          ...col
        }
      }
    }
  })

  return (
    <Table
      components={components}
      dataSource={data}
      columns={newColumns}
      rowKey='product_id'
    />
  )
}

export default Edit
