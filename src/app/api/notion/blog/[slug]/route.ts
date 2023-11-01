import variables from '@/variables'
import {
  convertBlocksToHTML,
  convertNotionPageArrayToBlog,
  queryDatabaseRecursivelyAsync,
  retrieveBlockRecursivelyAsync
} from '@/helpers'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
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

    return Response.json(blog)
  } catch (error) {
    return Response.json({ message: 'No record found' }, { status: 404 })
  }
}
