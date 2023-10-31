import axios from 'axios'
import variables from '@/variables'
import { Blog } from '@/models'

export async function GET() {
  const response = await axios.post(
    `https://api.notion.com/v1/databases/${variables.notion.database.blog}/query`,
    {},
    {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28'
      }
    }
  )

  const results: Array<Blog> = []

  for (const element of response.data.results) {
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
}
