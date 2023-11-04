import {
  StatusProperties,
  DateProperties,
  RichTextProperties,
  FilesProperties,
  MultiSelectProperties,
  UniqueIdProperties,
  TitleProperties,
  CreatedTime,
  LastEditedTime
} from '.'

/**
 * page
 */
export interface NotionPage {
  object: 'page'
  id: string
  created_time: string
  last_edited_time: string
  created_by: {
    object: string
    id: string
  }
  last_edited_by: {
    object: string
    id: string
  }
  cover: any
  icon: any
  parent: Object
  archived: boolean
  properties: {
    [key: string]:
      | StatusProperties
      | DateProperties
      | RichTextProperties
      | FilesProperties
      | MultiSelectProperties
      | UniqueIdProperties
      | TitleProperties
      | CreatedTime
      | LastEditedTime
  }
  url: string
  public_url: string | null
}
