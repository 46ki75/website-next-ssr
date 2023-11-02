'use client'

import React, { useEffect, useState } from 'react'

// interfaces
import { Blog } from '@/models'

// components
import { NotFound, notFoundBlogProps } from './NotFound'
import { Main } from '../components'

// context
import { useLoading } from '@/contexts'

export const BlogComponent = ({ slug }: { slug: string }) => {
  const { isLoading, setIsLoading } = useLoading()
  const [data, setDada] = useState<Blog>()

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/notion/blog/' + slug, { next: { revalidate: 1800 } })
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
      .finally(() => {
        setIsLoading(false)
      })
  }, [slug, setIsLoading])
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
