'use client'

import React, { useEffect, useState } from 'react'

// React Query
import { useQuery } from 'react-query'

// interfaces
import { Blog, NormalResponse } from '@/models/frontend'

// components
import { NotFound, notFoundBlogProps } from './NotFound'
import { Main } from '../components'

// context
import { useLoading } from '@/contexts'

async function fetchBlogContent(slug: string): Promise<Blog> {
  const response = await fetch(`/api/v1/blog/${slug}`, {
    next: { revalidate: 1800 }
  })
  if (!response.ok) throw new Error('Not Found')
  const result: NormalResponse<Blog> = await response.json()
  if (!result.data.length) throw new Error('Not Found')
  const [blog] = result.data
  return blog
}

export const BlogComponent = ({ slug }: { slug: string }) => {
  const { isLoading, setIsLoading } = useLoading()

  const {
    data,
    error,
    isLoading: queryLoading,
    isError: queryError
  } = useQuery<Blog, Error>(['blog', slug], () => fetchBlogContent(slug), {
    retry: false,
    staleTime: 900 * 1000,
    cacheTime: 900 * 1000,
    onSettled: () => setIsLoading(false),
    onSuccess: () => setIsLoading(false),
    onError: () => setIsLoading(false)
  })

  useEffect(() => {
    setIsLoading(queryLoading)
  }, [queryLoading, setIsLoading])

  if (queryError && error.message === 'Not Found') {
    return <Main blog={notFoundBlogProps} component={<NotFound />} />
  }

  return <Main blog={data} />
}
