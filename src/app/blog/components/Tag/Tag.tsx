'use client'

import React from 'react'

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

// framer-motion
import { motion } from 'framer-motion'

// scss modules
import styles from './Tag.module.scss'
import Link from 'next/link'

export const Tag = ({
  tags,
  isLinkEnable
}: {
  tags: Array<{ id: string; name: string; color: string }>
  isLinkEnable?: boolean
}) => {
  return (
    <div className={styles['tag-container']}>
      {tags.length ? (
        tags.map((tag: { id: string; name: string; color: string }, index) => (
          <motion.div
            key={tag.id}
            className={styles[tag.color]}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * index + 0.5, duration: 0.2 }}
          >
            {isLinkEnable ? (
              <Link href={`/blog?tag=${tag.name}`} scroll={false}>
                <span className={styles['tag-icon']}>
                  <FontAwesomeIcon icon={faTags} />
                </span>
                <span>{tag.name}</span>
              </Link>
            ) : (
              <>
                <span className={styles['tag-icon']}>
                  <FontAwesomeIcon icon={faTags} />
                </span>
                <span>{tag.name}</span>
              </>
            )}
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  )
}
