'use client'
import React, { useEffect } from 'react'

// models
import { Draft, NormalResponse } from '@/models/frontend'

// react-query
import { useQuery } from 'react-query'

// context
import { useLoading } from '@/contexts'

// components
import { NotFound, notFoundBlogProps } from './NotFound'
import { Main } from '../components'

async function fetchDraftContent(slug: string): Promise<Draft> {
  const response = await fetch(`/api/v1/draft/${slug}`, {
    next: { revalidate: 1800 }
  })
  if (!response.ok) throw new Error('Not Found')
  const result: NormalResponse<Draft> = await response.json()
  if (!result.data.length) throw new Error('Not Found')
  const [draft] = result.data
  return draft
}

export const DraftComponent = ({ slug }: { slug: string }) => {
  const { isLoading, setIsLoading } = useLoading()

  const {
    data,
    error,
    isLoading: queryLoading,
    isError: queryError
  } = useQuery<Draft, Error>(['draft', slug], () => fetchDraftContent(slug), {
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
    return <Main draft={notFoundBlogProps} component={<NotFound />} />
  }

  return <Main draft={data} />
}
