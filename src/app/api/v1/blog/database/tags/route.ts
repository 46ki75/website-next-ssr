import { NormalResponseBuilder } from '@/models/backend'
import { Client } from '@notionhq/client'
import config from '@/variables'
import _ from 'lodash'

const NOTION_TOKEN = process.env.NOTION_TOKEN

const notion = new Client({
  auth: NOTION_TOKEN
})

export async function GET(req: Request) {
  const pages = await notion.databases.query({
    database_id: config.notion.database.blog
  })

  const data = pages.results
    .map((element: any) => {
      return element.properties.tags.multi_select
    })
    .flat()

  const uniqueData = _.uniqBy(data, 'id')

  return Response.json(
    new NormalResponseBuilder().data(uniqueData).self(req.url).build()
  )
}
