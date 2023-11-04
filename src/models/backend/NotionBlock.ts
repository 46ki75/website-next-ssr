export interface NotionBlock {
  object: 'block'
  id: string
  parent: {
    type: string
    page_id: string
  }
  created_time: string
  last_edited_time: string
  created_by: { object: string; id: string }
  last_edited_by: { object: string; id: string }
  has_children: boolean
  archived: boolean
  type: string
  [key: string]: {}
}
