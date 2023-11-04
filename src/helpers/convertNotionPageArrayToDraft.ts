import { Draft } from '@/models/frontend'
import { NotionPage } from '@/models/backend'

export function convertNotionPageArrayToDraft(
  notionPageArray: Array<NotionPage>
) {
  const results: Array<Draft> = []

  for (const element of notionPageArray) {
    if (
      element.id === null ||
      !('unique_id' in element.properties.slug) ||
      !('title' in element.properties.title) ||
      !('rich_text' in element.properties.description) ||
      !('multi_select' in element.properties.tags) ||
      !('created_time' in element.properties.createdAt) ||
      !('last_edited_time' in element.properties.updatedAt) ||
      !('status' in element.properties.status) ||
      element.properties.status.status.name !== 'public'
    ) {
      continue
    }
    const data: Draft = {
      id: element.id,
      slug: String(element.properties.slug.unique_id.number),
      title: element.properties.title.title
        .map((item: any) => item.plain_text)
        .join(''),
      description: element.properties.description.rich_text
        .map((item: any) => item.plain_text)
        .join(''),
      tags: element.properties.tags.multi_select,
      createdAt: new Date(
        String(element.properties.createdAt.created_time)
      ).toISOString(),
      updatedAt: new Date(
        String(element.properties.updatedAt.last_edited_time)
      ).toISOString(),
      content: ''
    }

    results.push(data)
  }

  return results
}
