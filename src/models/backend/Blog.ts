import type {
  QueryDatabaseResponse,
  PartialPageObjectResponse,
  PartialDatabaseObjectResponse,
  DatabaseObjectResponse,
  PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints.d'

export class Blog {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  tags: Array<string>

  constructor(data: PageObjectResponse) {
    this.id = data.id
    this.title = data.properties.title.title[0].annotations.plain_text
    this.description = data.properties.description[0].annotations.plain_text
    this.createdAt = new Date(data.properties.createdAt.created_time)
    this.updatedAt = new Date(data.properties.updatedAt.last_edited_time)
    this.tags = data.properties.tags.multi_select.map(
      (element: any) => element.name
    )
  }
}
