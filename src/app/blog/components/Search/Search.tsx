'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// scss modules
import styles from './Search.module.scss'

// models
import { Blog, NormalResponse } from '@/models/frontend'

// global variables
import { Card, Tag } from '..'

const useMatchMedia = (mediaQuery: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(mediaQuery)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, mediaQuery])

  return matches
}

export const Search = () => {
  const [data, setData] = useState<Array<Blog>>()
  const [tags, setTags] =
    useState<Array<{ id: string; name: string; color: string }>>()

  const params = useSearchParams()

  useEffect(() => {
    const handleSearch = () => {
      const url = `/api/v1/blog/search?${params.toString()}`
      fetch(url, {
        next: { revalidate: 900 }
      })
        .then((res) => res.json())
        .then((result: NormalResponse<Blog>) => {
          setData(result.data)
        })
    }

    handleSearch()
  }, [params])

  useEffect(() => {
    fetch(`/api/v1/blog/tag`, {
      next: { revalidate: 900 }
    })
      .then((res) => res.json())
      .then(
        (
          result: NormalResponse<{ id: string; name: string; color: string }>
        ) => {
          setTags(result.data)
        }
      )
  }, [])

  const matches = useMatchMedia('(min-width: 1024px)')

  return (
    <>
      <h2>記事検索</h2>
      <span>{params.get('tag')}</span>
      <h3 id='tag'>タグ一覧</h3>
      <Tag
        tags={
          tags
            ? tags
            : [
                { id: 'x1', name: '????', color: '' },
                { id: 'x2', name: '????', color: '' },
                { id: 'x3', name: '????', color: '' }
              ]
        }
      />
      <div className={styles['selected-tag']}>
        <span>選択中のタグ:&nbsp;</span>

        <>
          {tags ? (
            <Tag tags={tags.filter((tag) => tag.name === params.get('tag'))} />
          ) : (
            <></>
          )}
        </>
      </div>

      <div className={styles['card-container']}>
        {data ? (
          data.map((blog, index) => (
            <Card
              blog={blog}
              index={index}
              key={blog.slug}
              style={matches ? { width: '49.5%' } : undefined}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
