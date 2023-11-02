// gloval variables
import variables from '@/variables'

// helper methods
import {
  queryDatabaseRecursivelyAsync,
  convertNotionPageArrayToBlog
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
}
