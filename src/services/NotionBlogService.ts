// gloval variables
import variables from '@/variables'

// helper methods
import {
  convertBlocksToHTML,
  convertNotionPageArrayToBlog,
  queryDatabaseRecursivelyAsync,
  retrieveBlockRecursivelyAsync
} from '@/helpers'

// interface
import { Blog } from '@/models'

export class NotionBlogService {
  static async getBlogListAsync(): Promise<Array<Blog>> {
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

    return results
  }

  static async getBlogBySlugAsync(slug: string): Promise<Blog> {
    const filter = {
      and: [
        {
          property: 'slug',
          unique_id: {
            equals: Number(slug)
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

    return blog
  }
}
