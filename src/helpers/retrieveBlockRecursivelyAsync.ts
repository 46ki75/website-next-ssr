import axios from 'axios'

export async function retrieveBlockRecursivelyAsync(id: string) {
  let blocks = await getContentById(id)
  return await getChildBlocks(blocks)
}

async function getContentById(id: string) {
  let hasMore = true
  let nextCursor: string | null = null
  const blocks = []
  while (hasMore) {
    const response: any = await axios.get(
      `https://api.notion.com/v1/blocks/${id}/children`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28'
        },
        params: { page_size: 100, start_cursor: nextCursor }
      }
    )
    for (const element of response.data.results) {
      blocks.push(element)
    }

    hasMore = response.data.has_more
    nextCursor = response.data.next_cursor
  }

  return blocks
}

async function getChildBlocks(blocks: Array<any>) {
  for (const [index, element] of blocks.entries()) {
    if (element.type === 'table') {
      const response: any = await axios.get(
        `https://api.notion.com/v1/blocks/${element.id}/children`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
            'Notion-Version': '2022-06-28'
          },
          params: { page_size: 100 }
        }
      )
      const tableRow = response.data.results.map(
        (element: any) => element.table_row
      )
      blocks[index].table.children = tableRow
    } else if (element.type === 'toggle') {
      const response: any = await axios.get(
        `https://api.notion.com/v1/blocks/${element.id}/children`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
            'Notion-Version': '2022-06-28'
          },
          params: { page_size: 100 }
        }
      )
      const roggleChildren = response.data.results.map(
        (element: any) => element
      )
      blocks[index].toggle.children = roggleChildren
    }
  }
  return blocks
}
