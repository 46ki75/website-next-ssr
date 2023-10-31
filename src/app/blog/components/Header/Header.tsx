'use client'

import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import variables from '@/variables'
import { useScroll } from 'framer-motion'

export const Header = () => {
  const [style, setStyle] = useState(styles['header-top'])
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      if (latest > 52) {
        setStyle(styles['header-scroll'])
      } else {
        setStyle(styles['header-top'])
      }
    })

    return () => {
      unsubscribe()
    }
  }, [scrollY])

  return (
    <header className={`${styles['header-common']} ${style}`}>
      {variables.siteName.ja}
    </header>
  )
}
