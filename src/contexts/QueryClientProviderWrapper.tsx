'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

type QueryClientProviderWrapperProps = {
  children: React.ReactNode
}

export const QueryClientProviderWrapper = ({
  children
}: QueryClientProviderWrapperProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
