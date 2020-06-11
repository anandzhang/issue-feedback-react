import React from 'react'
import { Table } from 'antd'
import EditableRow from './EditableRow'
import EditableCell from './EditableCell'

const EditableContext = React.createContext()

const EditableTable = props => {
  const { dataSource, columns, rowKey } = props
  const components = {
    body: {
      row: props => <EditableRow {...props} EditableContext={EditableContext} />,
      cell: props => <EditableCell {...props} EditableContext={EditableContext} />
    }
  }
  return (
    <Table
      components={components}
      dataSource={dataSource}
      columns={columns}
      rowKey={rowKey}
    />
  )
}

export default EditableTable
