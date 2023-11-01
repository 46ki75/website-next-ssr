import {
  convertNotionPageArrayToBlog,
  queryDatabaseRecursivelyAsync
} from '@/helpers'
import variables from '@/variables'

export async function GET(
  request: Request,
  { params }: { params: { tagName: string } }
) {
  try {
    const filter = {
      and: [
        {
          property: 'tags',
          multi_select: {
            contains: params.tagName
          }
        }
      ]
    }

    const data = await queryDatabaseRecursivelyAsync(
      variables.notion.database.blog,
      filter
    )

    const results = convertNotionPageArrayToBlog(data)

    return Response.json(results)
  } catch (error) {
    return Response.json({ message: 'Not Found' })
  }
}
