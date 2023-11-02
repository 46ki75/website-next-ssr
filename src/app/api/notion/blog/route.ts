import { NotionBlogService } from '@/services'

export async function GET() {
  return Response.json(await NotionBlogService.getBlogListAsync())
}
