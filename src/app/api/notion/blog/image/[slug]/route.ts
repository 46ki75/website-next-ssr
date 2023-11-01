import axios from 'axios'
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

    const imageResponse = await axios.get(imageURL, {
      responseType: 'arraybuffer'
    })

    return new Response(imageResponse.data, {
      headers: {
        'Content-Type': imageResponse.headers['content-type'],
        'Content-Length': imageResponse.headers['content-length']
      }
    })
  } catch (error) {
    const imageResponse = await axios.get(
      'http://localhost:3000/images/common/noimage_ogp.webp',
      {
        responseType: 'arraybuffer'
      }
    )
    return new Response(imageResponse.data, {
      headers: {
        'Content-Type': imageResponse.headers['content-type'],
        'Content-Length': imageResponse.headers['content-length']
      }
    })
  }
}
