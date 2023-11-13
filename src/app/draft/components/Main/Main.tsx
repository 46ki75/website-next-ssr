import React from 'react'

// models
import { Draft } from '@/models/frontend'

// material UI
import { Skeleton } from '@mui/material'

// components
import { Article, Date, Tag } from '../../components'

// scss module
import styles from './Main.module.scss'

export const Main = ({
  draft,
  component
}: {
  draft: Draft | undefined
  component?: React.JSX.Element
}) => {
  return (
    <>
      <h1>{draft ? draft.title : <Skeleton />}</h1>

      <div className={styles['tag-and-date-container']}>
        <Tag
          tags={
            draft
              ? draft.tags
              : [
                  { id: 'x1', name: '????', color: '' },
                  { id: 'x2', name: '????', color: '' },
                  { id: 'x3', name: '????', color: '' }
                ]
          }
          isLinkEnable={true}
        />
        <Date
          createdAt={draft ? draft.createdAt : '????-??-??'}
          updatedAt={draft ? draft.updatedAt : '????-??-??'}
        />
      </div>

      {draft ? (
        <Article content={draft.content} />
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
