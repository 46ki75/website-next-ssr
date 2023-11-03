'use client'

import React, { useEffect, useState, useRef } from 'react'

// contexts
import { useLoading } from '@/contexts'

// components
import { Loading } from '@/components'

export const LoadingRenderer = () => {
  const { isLoading } = useLoading()
  const [isLoadingDelay, setIsLoadingDelay] = useState(false)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isLoading) {
      setIsLoadingDelay(true)
    } else {
      timeoutId.current = setTimeout(() => {
        setIsLoadingDelay(false)
      }, 1000)
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [isLoading])

  return <>{isLoadingDelay ? <Loading isLoading={isLoading} /> : null}</>
}
