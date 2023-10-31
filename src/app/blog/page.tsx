import { Blog } from '@/models'
import { Main } from './components'
import React from 'react'

const blogTopProps: Blog = {
  slug: 'blog',
  title: 'ブログ',
  description: 'ブログトップ',
  ogpImage: '/images/common/noimage_ogp.webp',
  tags: [],
  createdAt: new Date('2022-10-01').toISOString(),
  updatedAt: new Date('2023-10-29').toISOString(),
  content: '<h2>Hello world</h2>'
}

const page = () => {
  return <Main blog={blogTopProps} />
}

export default page
