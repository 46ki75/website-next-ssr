'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// scss modules
import styles from './Search.module.scss'

// models
import { Blog, BlogTag, NormalResponse } from '@/models/frontend'

// global variables
import { Card, Tag } from '..'

// React Query
import { useQuery } from 'react-query'

async function fetchTags(): Promise<Array<BlogTag>> {
  const response = await fetch(`/api/v1/blog/tag`, {
    next: { revalidate: 1800 }
  })
  if (!response.ok) throw new Error('Fetching tag list is failed')
  const result: NormalResponse<BlogTag> = await response.json()
  return result.data
}

async function fetchBlogs(): Promise<Array<Blog>> {
  const response = await fetch(`/api/v1/blog`, { next: { revalidate: 1800 } })
  if (!response.ok) throw new Error('Network response was not ok')
  const result: NormalResponse<Blog> = await response.json()
  return result.data
}

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
  const params = useSearchParams()
  const [blogs, setBlogs] = useState<Array<Blog>>()

  const {
    data: tags,
    isLoading: isTagsLoading,
    isError: isTagsError
  } = useQuery<Array<BlogTag>, Error>('tags', fetchTags, {
    staleTime: 900 * 1000,
    cacheTime: 900 * 1000
  })

  const {
    data: rawBlogs,
    isLoading,
    isError
  } = useQuery<Array<Blog>, Error>('blogs', fetchBlogs, {
    staleTime: 900 * 1000,
    cacheTime: 900 * 1000,
    onSuccess: (data: Array<Blog>) => setBlogs(data)
  })
  const searchPositionRef = useRef<HTMLDivElement>(null)

  const scrollToElement = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      const top = ref.current.offsetTop
      window.scrollTo({
        top,
        behavior: 'smooth'
      })
    }
  }

  const [selectedTag, setSelectedTag] = useState<string | null>()

  useEffect(() => {
    setSelectedTag(params.get('tag'))
    const filterByTag = () => {
      if (selectedTag) {
        const filteredBlogs = rawBlogs?.filter((blog) =>
          blog.tags.some((tag) => tag.name === selectedTag)
        )
        scrollToElement(searchPositionRef)
        setBlogs(filteredBlogs)
      } else {
        setBlogs(rawBlogs)
      }
    }
    filterByTag()
  }, [params, rawBlogs, selectedTag])

  const matches = useMatchMedia('(min-width: 1024px)')

  return (
    <>
      <h2 ref={searchPositionRef}>記事検索</h2>
      <h3>タグ一覧</h3>
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
        isLinkEnable={true}
      />
      <div className={styles['selected-tag']}>
        <span>選択中のタグ:&nbsp;</span>

        <>
          {tags ? (
            <Tag
              tags={tags.filter((tag) => tag.name === selectedTag)}
              isLinkEnable={true}
            />
          ) : (
            <></>
          )}
        </>
      </div>

      <div className={styles['card-container']}>
        {blogs !== undefined ? (
          blogs.map((blog, index) => (
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
