'use client'

import { Blog } from '@/models'
import { Main } from '../components'
import React, { useEffect, useState } from 'react'

const notFoundBlog: Blog = {
  slug: '',
  title: 'お探しの記事は見つかりませんでした',
  description: 'ブログトップ',
  // TODO: implement not found image
  ogpImage: '/images/common/noimage_ogp.webp',
  tags: [],
  createdAt: new Date('2022-10-01').toISOString(),
  updatedAt: new Date('2023-11-02').toISOString(),
  content: '<h2>お探しの記事は見つかりませんでした</h2>'
}

export const BlogComponent = ({ slug }: { slug: string }) => {
  const [data, setDada] = useState<Blog>()

  useEffect(() => {
    fetch('/api/notion/blog/' + slug)
      .then((res) => {
        if (res.status === 404) {
          throw new Error('Not Found')
        }
        return res.json()
      })
      .then((result) => {
        setDada(result)
      })
      .catch((error) => {
        console.log(notFoundBlog)
        setDada(notFoundBlog)
      })
  }, [slug])
  return <Main blog={data} />
}
