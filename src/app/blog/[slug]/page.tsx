'use server'
import {
  queryDatabaseRecursivelyAsync,
  convertNotionPageArrayToBlog,
  retrieveBlockRecursivelyAsync,
  convertBlocksToHTML
} from '@/helpers'
import variables from '@/variables'
import { BlogComponent } from './BlogComponent'
import React from 'react'
import { Blog } from '@/models'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}) {
  try {
    const filter = {
      and: [
        {
          property: 'slug',
          unique_id: {
            equals: Number(params.slug)
          }
        }
      ]
    }

    const data = await queryDatabaseRecursivelyAsync(
      variables.notion.database.blog,
      filter
    )

    const [result] = data

    const [blog] = convertNotionPageArrayToBlog(data)

    const blocks = await retrieveBlockRecursivelyAsync(result.id)
    blog.content = convertBlocksToHTML(blocks)

    return {
      title: blog.title,
      description: blog.description,
      openGraph: {
        title: blog.title,
        description: blog.description,
        type: 'article',
        images: `${variables.host.prod}${blog.ogpImage}`,
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: ['Chomolungma Shirayuki']
      }
    }
  } catch {
    return {
      title: ''
    }
  }
}

/**
 * Fetch the available paths in advance for SSG.
 */
export async function generateStaticParams() {
  const filter = {
    or: [
      {
        property: 'status',
        status: {
          equals: 'public'
        }
      }
    ]
  }

  const sorts = [
    {
      property: 'createdAt',
      direction: 'descending'
    }
  ]

  const data = await queryDatabaseRecursivelyAsync(
    variables.notion.database.blog,
    filter,
    sorts
  )

  const results = convertNotionPageArrayToBlog(data)

  return results.map((element: Blog) => ({
    slug: element.slug
  }))
}

const Page = ({ params }: { params: { slug: string } }) => {
  return <BlogComponent slug={params.slug} />
}

export default Page
