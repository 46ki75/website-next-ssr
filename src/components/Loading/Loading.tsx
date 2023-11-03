'use client'

import React, { useEffect, useState } from 'react'

// Material UI
import { LinearProgress } from '@mui/material'

// scss modules
import styles from './Loading.module.scss'

const loadedStyle = {
  opacity: 0
}
const loadingStyle = {
  opacity: 1
}

export const Loading = ({ isLoading }: { isLoading: boolean }) => {
  const [randomString, setRandomString] = useState<string>('000%')

  const [counter, setCounter] = useState<number>(1)

  const [isLoadingDelay, setIsLoadingDelay] = useState<boolean>(true)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (!isLoading) {
      timeoutId = setTimeout(() => {
        setIsLoadingDelay(false)
      }, 500)
    } else {
      setIsLoadingDelay(true)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isLoading])

  useEffect(() => {
    if (!isLoadingDelay) return

    const intervalId = setInterval(() => {
      setRandomString(String(Math.floor(Math.random() * 900) + 100) + '%')
      setCounter((prev) => (prev < 100 ? prev + 1 : prev))
    }, 10)

    return () => clearInterval(intervalId)
  }, [isLoadingDelay])

  return (
    <div
      className={styles['loading-container']}
      style={isLoadingDelay ? loadingStyle : loadedStyle}
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
        {isLoadingDelay ? (
          <span className={styles['loading-text-loading']}>LOADING...</span>
        ) : (
          <span className={styles['loading-text-complete']}>
            LOADING COMPLETE!
          </span>
        )}
      </div>
      <div className={styles['square-container']}>
        <div className={styles.char}>
          {isLoadingDelay ? randomString : '100%'}
        </div>
        {Array.from({ length: counter }).map((_, index) => (
          <div
            className={
              index <= 5
                ? styles.large
                : index <= 12
                ? styles.medium
                : styles.small
            }
            key={index}
          />
        ))}
      </div>
      <LinearProgress color='inherit' className={styles.progress} />
    </div>
  )
}
