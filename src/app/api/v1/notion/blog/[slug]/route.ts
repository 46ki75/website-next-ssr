// services
import { NotionBlogService } from '@/services'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const blog = await NotionBlogService.getBlogBySlugAsync(params.slug)
    return Response.json(blog)
  } catch (error) {
    return Response.json({ message: 'No record found' }, { status: 404 })
  }
}
