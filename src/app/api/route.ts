import { NormalResponseBuilder } from '@/models/backend'

export async function GET(req: Request) {
  console.log(req)

  return Response.json(
    new NormalResponseBuilder()
      .pushData({
        message: 'This endpoint is the root of the API.'
      })
      .self(req.url)
      .build()
  )
}
