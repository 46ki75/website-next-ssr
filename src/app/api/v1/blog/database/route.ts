import { NormalResponseBuilder } from '@/models/backend'
import { Client } from '@notionhq/client'
import config from '@/variables'

const NOTION_TOKEN = process.env.NOTION_TOKEN

const notion = new Client({
  auth: NOTION_TOKEN
})

export async function GET(req: Request) {
  const pages = await notion.databases.query({
    database_id: config.notion.database.blog
  })

  const data = pages.results.map((element) => {
    return {
      id: element.id,
      createdAt: element.created_time,
      updatedAt: element.last_edited_time,
      title: element.properties.title.title[0].plain_text,
      tags: element.properties.tags.multi_select.map(
        (element: any) => element.name
      )
    }
  })

  return Response.json(
    new NormalResponseBuilder().data(data).self(req.url).build()
  )
}
