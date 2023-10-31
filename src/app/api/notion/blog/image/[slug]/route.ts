import axios from 'axios'
import variables from '@/variables'

/**
 * An asynchronous function to retrieve a page from a blog post slug.
 */
async function getPageBySlug(slug: string): Promise<any> {
  const response = await axios.post(
    `https://api.notion.com/v1/databases/${variables.notion.database.blog}/query`,
    {
      filter: {
        and: [
          {
            property: 'slug',
            unique_id: {
              equals: Number(slug)
            }
          }
        ]
      }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28'
      }
    }
  )

  if (response.data.results.length === 0) {
    throw new Error('no such record')
  }
  return response.data
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const response = await getPageBySlug(params.slug)
    let imageURL = 'http://localhost:3000/images/common/noimage_ogp.webp'
    if (response.results[0].properties.ogpImage.files.length !== 0) {
      imageURL = response.results[0].properties.ogpImage.files[0].file.url
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
