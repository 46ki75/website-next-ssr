'use client'

import React from 'react'

// scss modules
import styles from './Background.module.scss'

export const Background = () => {
  return (
    <>
      <div className={styles['parallax-container']}>
        <div className={styles['bg-back']}></div>
        <div className={styles['bg-front']}></div>
      </div>
    </>
  )
}
