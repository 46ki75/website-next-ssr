export async function retrieveBlockRecursivelyAsync(id: string) {
  let blocks = await getContentById(id)
  return await getChildBlocks(blocks)
}

async function getContentById(id: string) {
  let hasMore = true
  let nextCursor: string | null = null
  const blocks = []
  while (hasMore) {
    const url = new URL(`https://api.notion.com/v1/blocks/${id}/children`)
    url.searchParams.append('page_size', '100')
    if (nextCursor) {
      url.searchParams.append('start_cursor', nextCursor)
    }

    const rawResponse: Response = await fetch(url.toString(), {
      next: { revalidate: 1800 },
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28'
      }
    })

    const response = await rawResponse.json()

    for (const element of response.results) {
      blocks.push(element)
    }

    hasMore = response.has_more
    nextCursor = response.next_cursor
  }

  return blocks
}

async function getChildBlocks(blocks: Array<any>) {
  for (const [index, element] of blocks.entries()) {
    if (element.type === 'table') {
      const url = new URL(
        `https://api.notion.com/v1/blocks/${element.id}/children`
      )
      url.searchParams.append('page_size', '100')

      const rawResponse: Response = await fetch(url.toString(), {
        next: { revalidate: 1800 },
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28'
        }
      })

      const response = await rawResponse.json()

      const tableRow = response.results.map((element: any) => element.table_row)
      blocks[index].table.children = tableRow
    } else if (element.type === 'toggle') {
      const url = new URL(
        `https://api.notion.com/v1/blocks/${element.id}/children`
      )
      url.searchParams.append('page_size', '100')

      const rawResponse: Response = await fetch(url.toString(), {
        next: { revalidate: 1800 },
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28'
        }
      })

      const response = await rawResponse.json()
      const roggleChildren = response.results.map((element: any) => element)
      blocks[index].toggle.children = roggleChildren
    }
  }
  return blocks
}
