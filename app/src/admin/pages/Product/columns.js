import chinaDate from '../../../utils/chinaDate'

export default [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '描述',
    dataIndex: 'description'
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    render: date => chinaDate(date).fromNow()
  },
  {
    title: '创建人',
    dataIndex: 'manager_id'
  }
]
