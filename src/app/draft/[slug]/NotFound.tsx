import React from 'react'
import { Blog } from '@/models/frontend'

export const notFoundBlogProps: Blog = {
  slug: 'NotFound',
  title: 'お探しの記事は見つかりませんでした',
  description: 'Draftトップ',
  // TODO: implement not found image
  ogpImage: '/images/common/noimage_ogp.webp',
  tags: [],
  createdAt: new Date('2022-10-01').toISOString(),
  updatedAt: new Date('2023-11-02').toISOString(),
  content: ''
}

export const NotFound = () => {
  return (
    <>
      <h2>お探しの記事は見つかりませんでした</h2>
    </>
  )
}
