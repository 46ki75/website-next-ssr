import variables from '@/variables'
import {
  queryDatabaseRecursivelyAsync,
  convertNotionPageArrayToBlog
} from '@/helpers'

export async function GET() {
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

  return Response.json(results)
}
