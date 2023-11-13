// gloval variables
import variables from '@/variables'

// helper methods
import {
  convertBlocksToHTML,
  convertNotionPageArrayToDraft,
  queryDatabaseRecursivelyAsync,
  retrieveBlockRecursivelyAsync
} from '@/helpers'

// interface
import { Draft } from '@/models/frontend'

export class NotionDraftService {
  static async getDraftListAsync(): Promise<Array<Draft>> {
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
      variables.notion.database.draft,
      filter,
      sorts
    )
    const results = convertNotionPageArrayToDraft(data)

    return results
  }

  static async getDraftBySlugAsync(slug: string): Promise<Draft> {
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
      variables.notion.database.draft,
      filter
    )

    const [result] = data

    const [draft] = convertNotionPageArrayToDraft(data)

    const blocks = await retrieveBlockRecursivelyAsync(result.id)
    draft.content = convertBlocksToHTML(blocks)
    return draft
  }
}
