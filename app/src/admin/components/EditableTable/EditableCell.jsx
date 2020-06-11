import React, {
  useState,
  useEffect,
  useContext,
  useRef
} from 'react'
import { Form, Input, message } from 'antd'

const { Item } = Form

const EditableCell = props => {
  const {
    EditableContext,
    title,
    dataIndex,
    editable,
    children,
    record, // 这是 dataSource 中的数据项,
    handleSave,
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
      handleSave(values, record)
      toggleEdit()
    } catch ({ errorFields }) {
      const allErrorMsg = errorFields.map(({ errors }) => errors)
      allErrorMsg.forEach(msg => message.error(msg))
    }
  }

  let childNode = children
  if (editable) {
    childNode = editing
      ? (
        <Item
          name={dataIndex}
          rules={[{ required: true, message: `请输入${title}` }]}
          noStyle
        >
          <Input
            ref={input}
            onPressEnter={save}
            onBlur={save}
            style={stylesheet.input}
          />
        </Item>
      )
      : (
        <div
          onClick={toggleEdit}
          style={stylesheet.normalText}
        >
          {children}
        </div>
      )
  }

  return <td {...restProps}>{childNode}</td>
}

const stylesheet = {
  input: {
    width: 'inherit'
  },
  normalText: {
    width: '100%',
    cursor: 'text'
  }
}

export default EditableCell
