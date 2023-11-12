'use client'

import React, { useEffect, useState } from 'react'

// global variables
import variables from '@/variables'

// framer-motion
import { useScroll } from 'framer-motion'

// scss modules
import styles from './Header.module.scss'

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
