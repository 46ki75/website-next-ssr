'use server'

import axios from 'axios'
import { BlogComponent } from './BlogComponent'
import React from 'react'
import { Blog } from '@/models'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}) {
  try {
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
  } catch {
    return {
      title: ''
    }
  }
}

export async function generateStaticParams() {
  const response = await axios.get(`http://localhost:3000/api/notion/blog`)

  return response.data.map((element: Blog) => ({
    slug: element.slug
  }))
}

const Page = ({ params }: { params: { slug: string } }) => {
  return <BlogComponent slug={params.slug}></BlogComponent>
}

export default Page
