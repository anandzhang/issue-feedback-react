import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, Breadcrumb, Descriptions, Tag, Space } from 'antd'
import { LikeOutlined, DislikeOutlined, EditOutlined } from '@ant-design/icons'
import chinaDate from '../../../utils/chinaDate'
import STATUS from '../../../constants/Status'
import EditableItem from './EditableItem'

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

  const handleSave = value => {
    console.log(value)
  }

  const {
    title,
    status,
    owner,
    created_at,
    updated_at,
    likes,
    dislikes,
    tags,
    developers,
    description
  } = feedback
  return (
    <Card title={breadcrumb}>
      <Descriptions column={3}>
        <Item label='标题'>
          <EditableItem
            label='标题'
            name='title'
            value={title}
            handleSave={handleSave}
          />
        </Item>
        <Item label='状态'>{STATUS[status]}</Item>
        <Item label='创建人'>{owner.nickname}</Item>
        <Item label='更新时间'>{chinaDate(created_at).fromNow()}</Item>
        <Item label='创建时间'>{chinaDate(updated_at).format('lll')}</Item>
        <Item label='收到的观点'>
          <Space>
            <LikeOutlined />{likes}
            <DislikeOutlined />{dislikes}
          </Space>
        </Item>
        <Item label='标签' span={3}>
          {tags.map(({ name, color }) => (
            <Tag key={name} color={color}>{name}</Tag>
          ))}
        </Item>
        <Item label='开发人员' span={3}>
          <Space>
            {developers.map(({ nickname }) => nickname)}
            <EditOutlined />
          </Space>
        </Item>
        <Item label='描述'>
          <EditableItem
            label='描述'
            name='description'
            value={description}
            handleSave={handleSave}
          />
        </Item>
      </Descriptions>
    </Card>
  )
}

export default FeedbackDetail
