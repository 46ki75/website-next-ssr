'use client'

import React from 'react'
import Link from 'next/link'

// framer-motion
import { motion } from 'framer-motion'

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faHome,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons'

// scss modules
import styles from './Breadcrumb.module.scss'

export const Breadcrumb = ({ slug }: { slug: string | null }) => {
  return (
    <>
      <motion.ol
        className={styles.ol}
        initial='hidden'
        animate='visible'
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.li
          className={styles.li}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          <Link href='/'>
            <span className={styles.span}>
              <FontAwesomeIcon icon={faHome} color='#9a4359' />
              ホーム
            </span>
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className={styles.cheveron} />
        </motion.li>
        <motion.li
          className={styles.li}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          <Link href='/blog'>
            <span className={styles.span}>
              <FontAwesomeIcon icon={faFolderOpen} color='#96a8e9' />
              ブログ
            </span>
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className={styles.cheveron} />
        </motion.li>
        {slug === 'blog' || slug === null ? (
          <></>
        ) : (
          <motion.li
            className={styles.li}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            <Link href={`/blog/${slug}`}>
              <span className={styles.span}>
                <FontAwesomeIcon icon={faFolderOpen} color='#96a8e9' />
                記事
              </span>
            </Link>
          </motion.li>
        )}
      </motion.ol>
      <style jsx>
        {`
          span:hover {
            background-color: #e4e8f7;
          }
        `}
      </style>
    </>
  )
}
