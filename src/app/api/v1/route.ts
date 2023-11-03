import { NormalResponseBuilder } from '@/models/backend/ResponseBuilder'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  return Response.json(
    new NormalResponseBuilder()
      .pushData({
        message: 'This is v1 API root.'
      })
      .self(request.url)
      .build()
  )
}
