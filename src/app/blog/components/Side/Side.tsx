'use client'

import React, { useEffect, useState } from 'react'

// interfaces
import { Blog, NormalResponse } from '@/models/frontend'

// Material UI
import { Skeleton } from '@mui/material'

// scss modules
import styles from './Side.module.scss'

// components
import { Card } from '..'

// React Query
import { useQuery } from 'react-query'

async function fetchBlogs(): Promise<Array<Blog>> {
  const response = await fetch(`/api/v1/blog`, { next: { revalidate: 1800 } })
  if (!response.ok) throw new Error('Network response was not ok')
  const result: NormalResponse<Blog> = await response.json()
  return result.data
}

export const Side = () => {
  const { data, isLoading, isError } = useQuery<Array<Blog>, Error>(
    'blogs',
    fetchBlogs,
    { staleTime: 900 * 1000, cacheTime: 900 * 1000 }
  )

  if (isLoading) {
    return (
      <div className={styles.side}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <Skeleton
              animation='wave'
              variant='rectangular'
              height='240px'
              width='100%'
            />
            <Skeleton animation='wave' variant='text' height='30px' />
            <Skeleton animation='wave' variant='text' />
            <Skeleton animation='wave' variant='text' />
            <Skeleton animation='wave' variant='text' />
          </div>
        ))}
      </div>
    )
  }

  if (isError) return <div>Error loading blogs</div>

  return (
    <div className={styles.side}>
      {data && data.length > 0 ? (
        data.map((blog, index) => (
          <Card blog={blog} index={index} key={blog.slug} />
        ))
      ) : (
        <div>No blogs found</div>
      )}
    </div>
  )
}
