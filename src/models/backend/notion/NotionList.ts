import { NotionPage } from '.'

/**
 * list
 */
export interface NotionList {
  object: 'list'
  results: Array<NotionPage>
  next_cursor: string
  has_more: boolean
  type: string
  page_or_database: Object
  request_id: string
}
