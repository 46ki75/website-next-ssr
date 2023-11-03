import variables from '@/variables'
import { queryDatabaseRecursivelyAsync } from '@/helpers'
import fs from 'fs/promises'
import path from 'path'
import { lookup } from 'mime-types'

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

    if (
      'files' in data.properties.ogpImage &&
      data.properties.ogpImage.files.length !== 0
    ) {
      const imageURL = data.properties.ogpImage.files[0].file.url

      const imageResponse: Response = await fetch(imageURL)
      const arrayBuffer: ArrayBuffer = await imageResponse.arrayBuffer()

      return new Response(arrayBuffer, {
        headers: {
          'Content-Type': imageResponse.headers.get('content-type') || '',
          'Content-Length': imageResponse.headers.get('content-length') || ''
        }
      })
    } else {
      throw Error('Image Not Found')
    }
  } catch (error) {
    const defaultImagePath = path.resolve(
      'public/images/common/noimage_ogp.webp'
    )
    const defaultImageBuffer = await fs.readFile(defaultImagePath)
    const defaultMimeType = lookup(defaultImagePath) || ''

    return new Response(defaultImageBuffer, {
      headers: {
        'Content-Type': defaultMimeType,
        'Content-Length': defaultImageBuffer.length.toString()
      }
    })
  }
}
