import variables from '@/variables'
import axios from 'axios'

export async function GET() {
  try {
    const response = await axios.get(
      `https://api.notion.com/v1/databases/${variables.notion.database.blog}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28'
        }
      }
    )

    return Response.json(response.data.properties.tags.multi_select.options)
  } catch (error) {
    return Response.json({ message: 'Not Found' })
  }
}
