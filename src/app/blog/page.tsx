'use client'

import { Blog } from '@/models/frontend'
import { Main, Search } from './components'
import React from 'react'

import styles from './page.module.scss'

const blogTopProps: Blog = {
  slug: 'blog',
  title: 'ブログ',
  description: 'ブログトップ',
  ogpImage: '/images/common/noimage_ogp.webp',
  tags: [],
  createdAt: new Date('2022-10-01').toISOString(),
  updatedAt: new Date('2023-10-29').toISOString(),
  content: ''
}

const BlogTop = () => {
  return (
    <>
      <Search />
    </>
  )
}

const page = () => {
  return <Main blog={blogTopProps} component={<BlogTop />} />
}

export default page
