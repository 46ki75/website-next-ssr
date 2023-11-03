'use client'

import React, { useEffect, useState, useMemo } from 'react'
import styles from './Loading.module.scss'
import { LinearProgress } from '@mui/material'
import { motion } from 'framer-motion'

// useMemo を使用してメモ化
// eslint-disable-next-line react-hooks/rules-of-hooks
const loadedStyle = {
  opacity: 0
}
const loadingStyle = {
  opacity: 1
}

export const Loading = ({ isLoading }: { isLoading: boolean }) => {
  const [randomString, setRandomString] = useState<string>('')

  const [counter, setCounter] = useState<number>(3)

  useEffect(() => {
    if (!isLoading) return

    const intervalId = setInterval(() => {
      setRandomString(String(Math.floor(Math.random() * 900) + 100) + '%')
      setCounter((prev) => (prev < 100 ? prev + 2 : prev))
    }, 40)

    return () => clearInterval(intervalId)
  }, [isLoading])

  const maxElements = 50
  const array = useMemo(
    () => Array.from({ length: maxElements }, () => null),
    []
  )

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
            strokeWidth='1.5'
            fill='none'
            className={styles.line}
          />
          <polyline
            points='15.803,1.505 1.505,30.1 30.1,30.1 15.803,1.505'
            stroke='black'
            strokeWidth='1'
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
        {array.map((_, index) => (
          <div
            className={
              index <= 8
                ? styles.large
                : index <= 16
                ? styles.medium
                : styles.small
            }
            key={index}
            style={{ animationDelay: 0.03 * index + 's' }}
          />
        ))}
      </div>
      <LinearProgress color='inherit' className={styles.progress} />
    </div>
  )
}
