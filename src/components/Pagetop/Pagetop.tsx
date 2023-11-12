'use client'

import React from 'react'

// Material UI
import Tooltip from '@mui/material/Tooltip'

// scss modules
import styles from './Pagetop.module.scss'

export const Pagetop = () => {
  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, 150)
  }

  return (
    <>
      <Tooltip title='ページトップ'>
        <div className={styles.pagetop_container} onClick={scrollToTop}>
          <div className={styles.pagetop_sub_container}>
            <div className={styles.chevron}></div>
            <div className={styles.chevron}></div>
            <div className={styles.chevron}></div>
          </div>
        </div>
      </Tooltip>
      <span className={styles['page-top-fix-text']}>Page Top</span>
    </>
  )
}
