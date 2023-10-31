export interface Blog {
  id?: string
  slug: string
  title: string
  description: string
  ogpImage: string
  tags: Array<{ id: string; name: string; color: string }>
  createdAt: string
  updatedAt: string
  content: string
}
