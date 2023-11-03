import variables from '@/variables'
import { queryDatabaseRecursivelyAsync } from '@/helpers'

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

    const [data] = await queryDatabaseRecursivelyAsync(
      variables.notion.database.blog,
      filter
    )

    let imageURL = 'http://localhost:3000/images/common/noimage_ogp.webp'
    if (
      'files' in data.properties.ogpImage &&
      data.properties.ogpImage.files.length !== 0
    ) {
      imageURL = data.properties.ogpImage.files[0].file.url
    }

    const imageResponse: Response = await fetch(imageURL)
    const arrayBuffer: ArrayBuffer = await imageResponse.arrayBuffer()

    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': imageResponse.headers.get('content-type') || '',
        'Content-Length': imageResponse.headers.get('content-length') || ''
      }
    })
  } catch (error) {}
}
