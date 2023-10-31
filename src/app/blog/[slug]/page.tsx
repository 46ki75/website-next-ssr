'use server'

import axios from 'axios'
import { BlogComponent } from './BlogComponent'
import React from 'react'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}) {
  const response = await axios.get(
    `http://localhost:3000/api/notion/blog/${params.slug}`
  )

  return {
    title: response.data.title,
    description: response.data.description,
    openGraph: {
      title: response.data.title,
      description: response.data.description,
      type: 'article',
      images: [
        {
          url: response.data.ogpImage,
          width: 1200,
          height: 630
        }
      ],
      article: {
        publishedTime: response.data.createdAt,
        modifiedTime: response.data.updatedAt,
        authors: ['Chomolungma Shirayuki']
      }
    }
  }
}

const Page = ({ params }: { params: { slug: string } }) => {
  return <BlogComponent slug={params.slug}></BlogComponent>
}

export default Page
