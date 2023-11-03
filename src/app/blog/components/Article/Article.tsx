'use client'

import React, { useEffect, useRef } from 'react'

// code syntax highlight
import Prism from 'prismjs'
import './prism-onedark.css'
import 'prismjs/components/prism-typescript.min.js'
import 'prismjs/components/prism-rust.min.js'

// scss modules
import styles from './Article.module.scss'

export const Article = ({ content }: any) => {
  const articleRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    if (articleRef.current) {
      const handleClick = (e: Event) => {
        const target = e.target as HTMLElement

        if (target.classList.contains('toggle-caption')) {
          const sibling = target.nextElementSibling

          if (sibling && sibling.classList.contains('toggle-content')) {
            if (
              (sibling as HTMLElement).style.display === 'none' ||
              (sibling as HTMLElement).style.display === ''
            ) {
              ;(sibling as HTMLElement).style.display = 'block'
            } else {
              ;(sibling as HTMLElement).style.display = 'none'
            }
          }
        }
      }

      const timerId = setTimeout(() => {
        document.addEventListener('click', handleClick)
        Prism.highlightAllUnder(articleRef.current!)
      }, 100)

      return () => {
        clearTimeout(timerId)
        document.removeEventListener('click', handleClick)
      }
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
