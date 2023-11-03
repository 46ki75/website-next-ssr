'use client'

import { Blog } from '@/models'
import { Main } from './components'
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
  content: '<h2>Hello world</h2>'
}

const BlogTop = () => {
  return (
    <>
      <h2>これはブログトップだ</h2>
      <h2>これはブログトップだ</h2>
      <svg height='210' width='210'>
        <polyline
          points='105,10 10,200 200,200 105,10'
          stroke='black'
          strokeWidth='1'
          fill='none'
          className={styles.line}
        />
      </svg>
    </>
  )
}

const page = () => {
  return <Main blog={blogTopProps} component={<BlogTop />} />
}

export default page
