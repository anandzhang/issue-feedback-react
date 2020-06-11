import chinaDate from '../../../utils/chinaDate'

const STATUS = {
  opening: '未解决',
  closed: '已解决'
}

export default [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: status => STATUS[status]
  },
  {
    title: '描述',
    dataIndex: 'description'
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    render: date => chinaDate(date).fromNow()
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    render: date => chinaDate(date).format('lll')
  },
  {
    title: '创建人',
    dataIndex: 'owner',
    render: ({ nickname }) => nickname
  },
  {
    title: '开发人员',
    dataIndex: 'developers',
    render: ids => ids.map(id => id)
  }
]
