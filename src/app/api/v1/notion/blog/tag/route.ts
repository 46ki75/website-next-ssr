// helpers
import { getDatabaseSchemeAsync } from '@/helpers'

// global variables
import variables from '@/variables'

// ResponseBuilder
import {
  ErrorResponseBuilder,
  NormalResponseBuilder
} from '@/models/backend/ResponseBuilder'

export async function GET(request: Request) {
  try {
    const properties = await getDatabaseSchemeAsync(
      variables.notion.database.blog
    )

    const response = new NormalResponseBuilder()
      .data(properties.tags.multi_select.options)
      .self(request.url)
      .build()

    return Response.json(response)
  } catch (error) {
    const response = new ErrorResponseBuilder(429)
      .detail(
        "Request cannot be processed at this time because we have reached the Notion API's rate limit. Please wait before retrying."
      )
      .pointer('/api/v1/notion/tag')
      .parameter('rate_limit')
      .build()

    return Response.json(response, {
      status: 429,
      headers: { 'Retry-After': '60' }
    })
  }
}
