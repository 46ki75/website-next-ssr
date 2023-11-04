import React from 'react'
import Image from 'next/image'

// components
import { Article } from '..'
import { Breadcrumb, Date, Tag } from '../../components'
import { HR } from '@/components'

// interfaces
import { Blog } from '@/models/frontend'

// global variables
import variables from '@/variables'

// Material UI
import { Skeleton } from '@mui/material'

// scss modules
import styles from './Main.module.scss'

export const Main = ({
  blog,
  component
}: {
  blog: Blog | undefined
  component?: React.JSX.Element
}) => {
  return (
    <>
      <Breadcrumb slug={blog ? blog.slug : null} />

      <h1 className={styles.headline}>{blog ? blog.title : <Skeleton />}</h1>

      <div className={styles['tag-and-date-container']}>
        <Tag
          tags={
            blog
              ? blog.tags
              : [
                  { id: 'x1', name: '????', color: '' },
                  { id: 'x2', name: '????', color: '' },
                  { id: 'x3', name: '????', color: '' }
                ]
          }
        />
        <Date
          createdAt={blog ? blog.createdAt : '????-??-??'}
          updatedAt={blog ? blog.updatedAt : '????-??-??'}
        />
      </div>

      <HR />
      <Image
        className={styles['article-image']}
        src={blog ? blog.ogpImage : `data:image/${variables.fallbackImage}`}
        width='1200'
        height='630'
        alt={''}
        placeholder={`data:image/${variables.fallbackImage}`}
      />
      <HR />

      {blog ? (
        <Article content={blog.content} />
      ) : (
        <>
          <Skeleton variant='text' width={'100%'} height={'100px'} />
          <Skeleton variant='text' width={'100%'} height={'30px'} />
          <Skeleton variant='text' width={'100%'} height={'30px'} />
          <Skeleton variant='text' width={'100%'} height={'30px'} />
          <Skeleton variant='text' width={'100%'} height={'30px'} />
          <Skeleton variant='text' width={'100%'} height={'30px'} />
          <Skeleton variant='text' width={'100%'} height={'100px'} />
          <Skeleton variant='text' width={'100%'} height={'30px'} />
          <Skeleton variant='text' width={'100%'} height={'30px'} />
          <Skeleton variant='text' width={'100%'} height={'30px'} />
          <Skeleton variant='text' width={'100%'} height={'30px'} />
          <Skeleton variant='text' width={'100%'} height={'30px'} />
        </>
      )}

      {component === undefined ? <></> : component}
    </>
  )
}
