'use client'

import React from 'react'
import 'swagger-ui-react/swagger-ui.css'
import spec from './openapi.json'
import dynamic from 'next/dynamic'
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

const page = () => {
  return (
    <>
      <SwaggerUI spec={spec} />
    </>
  )
}

export default page
