// services
import { NotionBlogService } from '@/services'

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
    const blog = await NotionBlogService.getBlogBySlugAsync(params.slug)
    return Response.json(
      new NormalResponseBuilder().pushData(blog).self(request.url).build()
    )
  } catch (error) {
    const response = new ErrorResponseBuilder(404)
      .detail('No Blog content found. Please check request route parameter.')
      .pointer('/api/v1/blog/' + params.slug)
      .parameter('slug')
      .build()

    return Response.json(response, { status: 404 })
  }
}
