'use client'

import React, { useEffect, useState } from 'react'

// interfaces
import { Blog, NormalResponse } from '@/models/frontend'

// Material UI
import { Skeleton } from '@mui/material'

// scss modules
import styles from './Side.module.scss'
import { Card } from '..'

export const Side = () => {
  const [data, setData] = useState<Array<Blog>>([])

  useEffect(() => {
    fetch(`/api/v1/blog`, {
      next: { revalidate: 900 }
    })
      .then((res) => res.json())
      .then((result: NormalResponse<Blog>) => {
        setData(result.data)
      })
  }, [])

  return (
    <div className={styles.side}>
      {data.length ? (
        data.map((blog, index) => (
          <Card blog={blog} index={index} key={blog.slug} />
        ))
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
