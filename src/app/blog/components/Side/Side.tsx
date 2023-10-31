'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// framer-motion
import { motion } from 'framer-motion'

// interfaces
import { Blog } from '@/models'

// Material UI
import { Skeleton } from '@mui/material'

// global variables
import variables from '@/variables'

// scss modules
import styles from './Side.module.scss'
import { Date, Tag } from '..'

export const Side = () => {
  const [data, setData] = useState<Array<Blog>>([])

  useEffect(() => {
    fetch('/api/notion/blog', { next: { revalidate: 3600 } })
      .then((res) => res.json())
      .then((result) => {
        setData(result)
      })
  }, [])

  const pathname = usePathname()

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, 200)
  }, [pathname])

  return (
    <div className={styles.side}>
      {data.length ? (
        data.map((element, index) => (
          <motion.div
            key={index}
            className={styles['blog-card']}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 * index, duration: 0.4 }}
          >
            <Link href={`/blog/${element.slug}`} scroll={false}>
              <Image
                src={element.ogpImage}
                width='1200'
                height='630'
                alt=''
                placeholder={`data:image/${variables.fallbackImage}`}
              />
              <div className={styles['caption-container']}>
                <span>{element.title}</span>
                <p>{element.description}</p>
              </div>

              <div className={styles['tag-and-date-container']}>
                <Tag tags={element.tags} />
                <Date
                  createdAt={element.createdAt}
                  updatedAt={element.updatedAt}
                />
              </div>
            </Link>
          </motion.div>
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
