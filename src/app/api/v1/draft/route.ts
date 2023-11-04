import {
  ErrorResponseBuilder,
  NormalResponseBuilder
} from '@/models/backend/ResponseBuilder'
import { NotionDraftService } from '@/services'

export async function GET(request: Request) {
  try {
    const results = await NotionDraftService.getDraftListAsync()
    const response = new NormalResponseBuilder()
      .data(results)
      .self(request.url)
      .build()
    return Response.json(response)
  } catch {
    const response = new ErrorResponseBuilder(500)
      .detail('Internal Server Error')
      .pointer('/v1/draft')
      .build()
    return Response.json(response, { status: 500 })
  }
}
