import {
  ErrorResponseBuilder,
  NormalResponseBuilder
} from '@/models/backend/ResponseBuilder'
import { NotionBlogService } from '@/services'

export async function GET() {
  try {
    const results = await NotionBlogService.getBlogListAsync()
    const response = new NormalResponseBuilder().data(results).build()
    return Response.json(response)
  } catch {
    const response = new ErrorResponseBuilder(500)
      .detail('Internal Server Error')
      .pointer('/v1/draft')
      .build()
    return Response.json(response, { status: 500 })
  }
}
