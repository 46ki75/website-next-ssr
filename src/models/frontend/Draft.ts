export interface Draft {
  id?: string
  slug: string
  title: string
  description: string
  tags: Array<{ id: string; name: string; color: string }>
  createdAt: string
  updatedAt: string
  content: string
}
