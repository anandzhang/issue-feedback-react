import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, Breadcrumb, Descriptions, Tag } from 'antd'
import chinaDate from '../../../utils/chinaDate'

const { Item } = Descriptions

const breadcrumb = (
  <Breadcrumb style={{ fontSize: 'initial' }}>
    <Breadcrumb.Item>
      <Link to='/admin/manage/feedback'>反馈管理</Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>反馈详情</Breadcrumb.Item>
  </Breadcrumb>
)

const FeedbackDetail = () => {
  const location = useLocation()
  const { feedback } = location.state
  console.log(feedback)
  const {
    title,
    status,
    owner,
    created_at,
    updated_at,
    tags,
    developers,
    description
  } = feedback
  return (
    <Card title={breadcrumb}>
      <Descriptions>
        <Item label='标题'>{title}</Item>
        <Item label='状态'>{status}</Item>
        <Item label='创建人'>{owner.nickname}</Item>
        <Item label='更新时间'>{chinaDate(created_at).fromNow()}</Item>
        <Item label='创建时间' span={2}>{chinaDate(updated_at).format('lll')}</Item>
        <Item label='标签' span={3}>
          {tags.map(({ name, color }) => (
            <Tag key={name} color={color}>{name}</Tag>
          ))}
        </Item>
        <Item label='开发人员' span={3}>{developers[0]}</Item>
        <Item label='描述'>{description}</Item>
      </Descriptions>
    </Card>
  )
}

export default FeedbackDetail
