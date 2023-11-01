import {
  DateProperties,
  FilesProperties,
  MultiSelectProperties,
  RichTextProperties,
  StatusProperties,
  TitleProperties,
  UniqueIdProperties
} from '.'

export interface NotionBlogProperties {
  slug: UniqueIdProperties
  title: TitleProperties
  description: RichTextProperties
  tags: MultiSelectProperties
  ogpImage: FilesProperties
  createdAt: DateProperties
  updatedAt: DateProperties
  status: StatusProperties
}
