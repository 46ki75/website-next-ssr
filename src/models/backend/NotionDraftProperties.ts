import {
  CreatedTime,
  LastEditedTime,
  MultiSelectProperties,
  RichTextProperties,
  StatusProperties,
  TitleProperties,
  UniqueIdProperties
} from '.'

export interface NotionDraftProperties {
  slug: UniqueIdProperties
  title: TitleProperties
  description: RichTextProperties
  tags: MultiSelectProperties
  createdAt: CreatedTime
  updatedAt: LastEditedTime
  status: StatusProperties
}
