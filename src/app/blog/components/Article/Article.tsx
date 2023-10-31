'use client'

import React, { useEffect, useRef } from 'react'

// code syntax highlight
import Prism from 'prismjs'
import './prism-onedark.css'
import 'prismjs/components/prism-typescript.min.js'

// scss modules
import styles from './Article.module.scss'

export const Article = ({ content }: any) => {
  const articleRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (articleRef.current) {
      Prism.highlightAllUnder(articleRef.current)
    }
  }, [content])
  return (
    <article
      ref={articleRef}
      className={styles.article}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
