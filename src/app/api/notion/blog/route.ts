import { NotionBlogService } from '@/services'

export async function GET() {
  try {
    const results = await NotionBlogService.getBlogListAsync()
    return Response.json(results)
  } catch {
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
