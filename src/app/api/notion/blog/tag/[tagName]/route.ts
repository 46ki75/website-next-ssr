import { queryDatabaseRecursivelyAsync } from '@/helpers'
import { Blog } from '@/models'
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

    const results: Array<Blog> = []

    for (const element of data as any) {
      if (
        element.id === null ||
        element.properties.slug.unique_id === null ||
        element.properties.title.title.length === 0 ||
        element.properties.description.rich_text.length === 0 ||
        element.properties.createdAt.date === null ||
        element.properties.updatedAt.date === null ||
        element.properties.status.status.name !== 'public'
      ) {
        continue
      }
      const data: Blog = {
        id: element.id,
        slug: element.properties.slug.unique_id.number,
        title: element.properties.title.title
          .map((item: any) => item.plain_text)
          .join(''),
        description: element.properties.description.rich_text
          .map((item: any) => item.plain_text)
          .join(''),
        ogpImage:
          '/api/notion/blog/image/' + element.properties.slug.unique_id.number,
        tags: element.properties.tags.multi_select,
        createdAt: new Date(
          element.properties.createdAt.date.start
        ).toISOString(),
        updatedAt: new Date(
          element.properties.updatedAt.date.start
        ).toISOString(),
        content: ''
      }

      results.push(data)
    }

    return Response.json(results)
  } catch (error) {
    return Response.json({ message: 'Not Found' })
  }
}
