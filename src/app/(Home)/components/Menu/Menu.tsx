import React from 'react'
import Link from 'next/link'

// scss modules
import styles from './Menu.module.scss'

export const Menu = () => {
  return (
    <div className={styles['menu-container']}>
      <Link href='/blog'>blog</Link>
    </div>
  )
}
