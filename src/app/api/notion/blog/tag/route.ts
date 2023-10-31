import { queryDatabaseRecursivelyAsync } from '@/helpers'
import { MultiSelectProperties } from '@/models/backend/notion'
import variables from '@/variables'
import _ from 'lodash'

export async function GET() {
  const data = await queryDatabaseRecursivelyAsync(
    variables.notion.database.blog
  )

  const tags: Array<{
    id: string
    name: string
    color: string
  }> = []

  for (const element of data) {
    if ('tags' in element.properties) {
      for (const tag of (element.properties.tags as MultiSelectProperties)
        .multi_select) {
        tags.push(tag)
      }
    }
  }

  const uniqueTags = _.uniqBy(tags, 'id')

  return Response.json(uniqueTags)
}
