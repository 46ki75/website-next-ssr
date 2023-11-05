export interface Blog {
  id?: string
  slug: string
  title: string
  description: string
  ogpImage: string
  tags: Array<BlogTag>
  createdAt: string
  updatedAt: string
  content: string
}

export interface BlogTag {
  id: string
  name: string
  color: string
}
