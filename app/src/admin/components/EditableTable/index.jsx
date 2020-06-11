import React from 'react'
import { Table } from 'antd'
import EditableRow from './EditableRow'
import EditableCell from './EditableCell'

const EditableContext = React.createContext()

const EditableTable = props => {
  const { dataSource, columns, rowKey, handleSave } = props
  let newColumns = [...columns]
  newColumns = newColumns.map(col => {
    const { title, dataIndex, editable } = col
    if (!editable) return col
    return {
      ...col,
      onCell: record => ({
        record,
        title,
        dataIndex,
        editable,
        handleSave
      })
    }
  })
  const components = {
    body: {
      row: props => (
        <EditableRow
          {...props}
          EditableContext={EditableContext}
        />
      ),
      cell: props => (
        <EditableCell
          {...props}
          EditableContext={EditableContext}
        />
      )
    }
  }
  return (
    <Table
      components={components}
      dataSource={dataSource}
      columns={newColumns}
      rowKey={rowKey}
    />
  )
}

export default EditableTable
