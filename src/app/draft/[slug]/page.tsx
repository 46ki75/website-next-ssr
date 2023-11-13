'use server'
import React from 'react'

// components
import { DraftComponent } from './DraftComponent'

// services
import { NotionDraftService } from '@/services'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}) {
  try {
    const blog = await NotionDraftService.getDraftBySlugAsync(params.slug)

    return {
      title: blog.title,
      description: blog.description,
      openGraph: {
        title: blog.title,
        description: blog.description,
        type: 'article',
        // TODO: implement default OGP image
        images: ``,
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

const Page = ({ params }: { params: { slug: string } }) => {
  return <DraftComponent slug={params.slug} />
}

export default Page
