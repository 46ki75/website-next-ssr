'use client'

import React from 'react'

// models
import { Draft, NormalResponse } from '@/models/frontend'

// react-query
import { useQuery } from 'react-query'
import Link from 'next/link'

// scss modules
import styles from './Side.module.scss'

async function fetchBlogs(): Promise<Array<Draft>> {
  const response = await fetch(`/api/v1/draft`, { next: { revalidate: 1800 } })
  if (!response.ok) throw new Error('Network response was not ok')
  const result: NormalResponse<Draft> = await response.json()
  return result.data
}

export const Side = () => {
  const { data, isLoading, isError } = useQuery<Array<Draft>, Error>(
    'drafts',
    fetchBlogs,
    { staleTime: 900 * 1000, cacheTime: 900 * 1000 }
  )

  if (isLoading) return <>Loading</>

  if (isError) return <>Error</>

  return (
    <div className={styles.side}>
      <ul>
        {data?.map((draft) => (
          <Link href={`/draft/${draft.slug}`} key={draft.slug}>
            <li>{draft.title} </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
