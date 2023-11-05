import {
  convertNotionPageArrayToBlog,
  queryDatabaseRecursivelyAsync
} from '@/helpers'
import {
  ErrorResponseBuilder,
  NormalResponseBuilder
} from '@/models/backend/ResponseBuilder'
import variables from '@/variables'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const tags = url.searchParams.getAll('tag')
    const keyword = url.searchParams.get('keyword')

    const andFilterParams: any[] = []
    const orFilterParams = []

    tags.map((tag: string) => {
      andFilterParams.push({
        property: 'tags',
        multi_select: {
          contains: tag
        }
      })
    })

    if (keyword) {
      andFilterParams.push({
        or: [
          { property: 'title', title: { contains: keyword } },
          { property: 'description', rich_text: { contains: keyword } }
        ]
      })
    }

    const filter = {
      and: andFilterParams
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

    const response = new NormalResponseBuilder()
      .data(results)
      .self(request.url)
      .build()

    return Response.json(response)
  } catch (error) {
    const response = new ErrorResponseBuilder(500)
      .detail('Internal Server Error')
      .pointer('/v1/blog/search')
      .build()
    return Response.json(response, { status: 500 })
  }
}
