'use client'

import React, { useState } from 'react'

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

const menuStyle = (isActive: boolean) => {
  if (isActive) return { transform: 'translateX(0%)' }
  return { transform: 'translateX(-100%)' }
}

export const Side = () => {
  const [isActive, setIsActive] = useState(false)

  const { data, isLoading, isError } = useQuery<Array<Draft>, Error>(
    'drafts',
    fetchBlogs,
    { staleTime: 900 * 1000, cacheTime: 900 * 1000 }
  )

  if (isLoading) return <div className={styles.side}>Loading</div>

  if (isError) return <div className={styles.side}>Error</div>

  return (
    <>
      <div
        className={styles.button}
        onClick={() => {
          setIsActive(!isActive)
        }}
      ></div>
      <div className={styles.side} style={menuStyle(isActive)}>
        <ul>
          {data?.map((draft) => (
            <Link href={`/draft/${draft.slug}`} key={draft.slug}>
              <li>{draft.title} </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  )
}
