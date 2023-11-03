'use server'
import React from 'react'

// global variables
import variables from '@/variables'

// components
import { BlogComponent } from './BlogComponent'

// services
import { NotionBlogService } from '@/services'

// export async function generateMetadata({
//   params
// }: {
//   params: { slug: string }
// }) {
//   try {
//     const blog = await NotionBlogService.getBlogBySlugAsync(params.slug)

//     return {
//       title: blog.title,
//       description: blog.description,
//       openGraph: {
//         title: blog.title,
//         description: blog.description,
//         type: 'article',
//         images: `${variables.host.prod}${blog.ogpImage}`,
//         publishedTime: blog.createdAt,
//         modifiedTime: blog.updatedAt,
//         authors: ['Chomolungma Shirayuki']
//       }
//     }
//   } catch {
//     return {
//       title: ''
//     }
//   }
// }

/**
 * Fetch the available paths in advance for SSG.
 */
// export async function generateStaticParams() {
// const results = await NotionBlogService.getBlogListAsync()
// return results.map((element: Blog) => ({
//   slug: element.slug
// }))
// }

const Page = ({ params }: { params: { slug: string } }) => {
  return <BlogComponent slug={params.slug} />
}

export default Page
