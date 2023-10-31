import React from 'react'
import styles from './Section1.module.scss'
import variables from '@/variables'

import { Background } from '../..'
import staticImageData from './Section1-bg.webp'

export const Section1 = () => {
  return (
    <div
      className={styles['section-container']}
      style={{ position: 'relative' }}
    >
      <span className={styles['side-container']}>
        <div>
          <span>{variables.siteName.ja}</span>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </span>

      <Background {...staticImageData} />
    </div>
  )
}
