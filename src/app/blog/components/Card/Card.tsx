'use client'

import Image from 'next/image'
import Link from 'next/link'

// framer-motion
import { motion } from 'framer-motion'

// interfaces
import { Blog } from '@/models/frontend'

// global variables
import variables from '@/variables'

// scss modules
import styles from './Card.module.scss'
import { Date, Tag } from '..'

export const Card = ({
  blog,
  index,
  style
}: {
  blog: Blog
  index: number
  style?: React.CSSProperties
}) => {
  return (
    <>
      <motion.div
        key={index}
        className={styles['blog-card']}
        style={style}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 * index, duration: 0.4 }}
        onClick={() => {
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })
          }, 200)
        }}
      >
        <Link href={`/blog/${blog.slug}`} scroll={false}>
          <Image
            src={blog.ogpImage}
            width='1200'
            height='630'
            alt=''
            placeholder={`data:image/${variables.fallbackImage}`}
          />
          <div className={styles['caption-container']}>
            <span>{blog.title}</span>
            <p>{blog.description}</p>
          </div>

          <div className={styles['tag-and-date-container']}>
            <Tag tags={blog.tags} isLinkEnable={false} />
            <Date createdAt={blog.createdAt} updatedAt={blog.updatedAt} />
          </div>
        </Link>
      </motion.div>
    </>
  )
}
