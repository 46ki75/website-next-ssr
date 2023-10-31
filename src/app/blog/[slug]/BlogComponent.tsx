'use client'

import { Blog } from '@/models'
import { Main } from '../components'
import React, { useEffect, useState } from 'react'

export const BlogComponent = ({ slug }: { slug: string }) => {
  const [data, setDate] = useState<Blog>()

  useEffect(() => {
    fetch('/api/notion/blog/' + slug)
      .then((res) => res.json())
      .then((result) => {
        setDate(result)
      })
  }, [slug])
  return <Main blog={data} />
}
