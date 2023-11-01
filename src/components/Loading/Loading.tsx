'use client'

import React, { useEffect, useState } from 'react'

// framer motion
import { motion } from 'framer-motion'

// scss module
import styles from './Loading.module.scss'

// material UI
import { LinearProgress } from '@mui/material'

const getRandomString = (length: number) => {
  const characters = '1234567890?!x%'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

const loadedStyle = {
  opacity: 0
}
const loadingStyle = {
  opacity: 1
}

export const Loading = ({ isLoading }: { isLoading: boolean }) => {
  const [randomString, setRandomString] = useState<string>('')
  const [array, setArray] = useState<null[]>([])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomString(getRandomString(4))
      if (array.length < 100 && isLoading)
        setArray((prevItems) => [...prevItems, null, null])
    }, 20)
    return () => {
      clearInterval(intervalId)
    }
  }, [array.length, isLoading])

  return (
    <div
      className={styles['loading-container']}
      style={isLoading ? loadingStyle : loadedStyle}
    >
      <div className={styles['svg-container']}>
        <svg height='32' width='32'>
          <polyline
            points='15.803,1.505 1.505,30.1 30.1,30.1 15.803,1.505'
            stroke='white'
            stroke-width='1.5'
            fill='none'
            className={styles.line}
          />
          <polyline
            points='15.803,1.505 1.505,30.1 30.1,30.1 15.803,1.505'
            stroke='black'
            stroke-width='1'
            fill='none'
            className={styles.line}
          />
        </svg>
        {isLoading ? (
          <span className={styles['loading-text-loading']}>LOADING...</span>
        ) : (
          <span className={styles['loading-text-complete']}>COMPLETE!</span>
        )}
      </div>
      <div className={styles['square-container']}>
        <div className={styles.char}>{isLoading ? randomString : '100%'}</div>
        {array.map((_, index) =>
          index <= 8 ? (
            <motion.div className={styles.large} key={index} />
          ) : index <= 16 ? (
            <motion.div className={styles.medium} key={index} />
          ) : (
            <motion.div className={styles.small} key={index} />
          )
        )}
      </div>
      <LinearProgress color='inherit' className={styles.progress} />
    </div>
  )
}
