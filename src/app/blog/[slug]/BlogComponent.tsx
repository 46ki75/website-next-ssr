'use client'

import { Blog } from '@/models'
import { Main } from '../components'
import React, { useEffect, useState } from 'react'
import { NotFound, notFoundBlogProps } from './NotFound'

export const BlogComponent = ({ slug }: { slug: string }) => {
  const [data, setDada] = useState<Blog>()

  useEffect(() => {
    fetch('/api/notion/blog/' + slug, { next: { revalidate: 3600 } })
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
        setDada(notFoundBlogProps)
      })
  }, [slug])
  return (
    <>
      {data?.slug === 'NotFound' ? (
        <Main blog={data} component={<NotFound />} />
      ) : (
        <Main blog={data} />
      )}
    </>
  )
}
