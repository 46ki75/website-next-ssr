// services
import { NotionDraftService } from '@/services'

// ResponseBuilder
import {
  ErrorResponseBuilder,
  NormalResponseBuilder
} from '@/models/backend/ResponseBuilder'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const draft = await NotionDraftService.getDraftBySlugAsync(params.slug)
    return Response.json(
      new NormalResponseBuilder().pushData(draft).self(request.url).build()
    )
  } catch (error) {
    const response = new ErrorResponseBuilder(404)
      .detail('No Draft content found. Please check request route parameter.')
      .pointer('/api/v1/draft/' + params.slug)
      .parameter('slug')
      .build()

    return Response.json(response, { status: 404 })
  }
}
