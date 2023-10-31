import axios from 'axios'
import { NotionList, NotionPage } from '@/models/backend/notion'

export async function queryDatabaseRecursivelyAsync(
  notionDatabaseId: string
): Promise<Array<NotionPage>>
export async function queryDatabaseRecursivelyAsync(
  notionDatabaseId: string,
  filter: {}
): Promise<Array<NotionPage>>
export async function queryDatabaseRecursivelyAsync(
  notionDatabaseId: string,
  filter?: {}
): Promise<Array<NotionPage>> {
  let results: Array<NotionPage> = []
  let start_cursor: undefined | string
  let has_more = true
  const reqBody: {
    start_cursor: string | undefined
    page_size: number
    filter?: {}
  } = {
    start_cursor: start_cursor,
    page_size: 100
  }
  if (filter !== undefined) reqBody.filter = filter

  while (has_more) {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${notionDatabaseId}/query`,
      reqBody,
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28'
        }
      }
    )

    for (const result of response.data.results) {
      results.push(result)
    }

    has_more = (response.data as NotionList).has_more
    start_cursor = (response.data as NotionList).next_cursor
  }

  return results
}
