import { NotionList, NotionPage } from '@/models/backend'

export async function queryDatabaseRecursivelyAsync(
  notionDatabaseId: string
): Promise<Array<NotionPage>>
export async function queryDatabaseRecursivelyAsync(
  notionDatabaseId: string,
  filter: {}
): Promise<Array<NotionPage>>
export async function queryDatabaseRecursivelyAsync(
  notionDatabaseId: string,
  filter: {},
  sorts: Array<{
    property: string
    direction: 'ascending' | 'descending' | string
  }>
): Promise<Array<NotionPage>>
export async function queryDatabaseRecursivelyAsync(
  notionDatabaseId: string,
  filter?: {},
  sorts?: Array<{
    property: string
    direction: 'ascending' | 'descending' | string
  }>
): Promise<Array<NotionPage>> {
  let results: Array<NotionPage> = []
  let start_cursor: undefined | string
  let has_more = true
  const reqBody: {
    start_cursor: string | undefined
    page_size: number
    filter?: {}
    sorts?: Array<{
      property: string
      direction: 'ascending' | 'descending' | string
    }>
  } = {
    start_cursor: start_cursor,
    page_size: 100
  }
  if (filter !== undefined) reqBody.filter = filter
  if (sorts !== undefined) reqBody.sorts = sorts

  while (has_more) {
    const rawResponse = await fetch(
      `https://api.notion.com/v1/databases/${notionDatabaseId}/query`,
      {
        next: { revalidate: 900 },
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      }
    )

    const response = await rawResponse.json()

    for (const result of response.results) {
      results.push(result)
    }

    has_more = (response as NotionList).has_more
    start_cursor = (response as NotionList).next_cursor
  }

  return results
}
