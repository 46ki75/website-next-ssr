import { NormalResponseBuilder } from '@/models/backend/ResponseBuilder'
import { NotionBlogService } from '@/services'

export async function GET() {
  try {
    const results = await NotionBlogService.getBlogListAsync()
    return Response.json(new NormalResponseBuilder().data(results).build())
  } catch {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
