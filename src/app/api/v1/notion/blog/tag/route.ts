import variables from '@/variables'

export async function GET() {
  try {
    const response: Response = await fetch(
      `https://api.notion.com/v1/databases/${variables.notion.database.blog}`,
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

    return Response.json(data.properties.tags.multi_select.options)
  } catch (error) {
    return Response.json({ message: 'Not Found' })
  }
}
