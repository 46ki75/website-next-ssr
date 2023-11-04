import { Blog } from '@/models/frontend'
import { NotionPage } from '@/models/backend'

export function convertNotionPageArrayToBlog(
  notionPageArray: Array<NotionPage>
) {
  const results: Array<Blog> = []

  for (const element of notionPageArray) {
    if (
      element.id === null ||
      !('unique_id' in element.properties.slug) ||
      !('title' in element.properties.title) ||
      !('rich_text' in element.properties.description) ||
      !('multi_select' in element.properties.tags) ||
      !('date' in element.properties.createdAt) ||
      !('date' in element.properties.updatedAt) ||
      !('status' in element.properties.status) ||
      element.properties.status.status.name !== 'public'
    ) {
      continue
    }
    const data: Blog = {
      id: element.id,
      slug: String(element.properties.slug.unique_id.number),
      title: element.properties.title.title
        .map((item: any) => item.plain_text)
        .join(''),
      description: element.properties.description.rich_text
        .map((item: any) => item.plain_text)
        .join(''),
      ogpImage:
        '/api/v1/blog/image/' + element.properties.slug.unique_id.number,
      tags: element.properties.tags.multi_select,
      createdAt: new Date(
        String(element.properties.createdAt.date.start)
      ).toISOString(),
      updatedAt: new Date(
        String(element.properties.updatedAt.date.start)
      ).toISOString(),
      content: ''
    }

    results.push(data)
  }

  return results
}
