export async function getDatabaseSchemeAsync(notionDatabaseId: string) {
  const response: Response = await fetch(
    `https://api.notion.com/v1/databases/${notionDatabaseId}`,
    {
      next: { revalidate: 900 },
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28'
      }
    }
  )

  const data = await response.json()

  return data.properties
}
