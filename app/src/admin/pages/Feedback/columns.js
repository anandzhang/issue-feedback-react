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
    title: '更新时间',
    dataIndex: 'updated_at',
    render: date => chinaDate(date).fromNow()
  },
  {
    title: '创建人',
    dataIndex: 'owner',
    render: ({ nickname }) => nickname
  }
]
