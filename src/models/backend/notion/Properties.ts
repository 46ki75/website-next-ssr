/**
 * page
 */
export interface Page {
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
  properties: Object
  url: string
  public_url: string | null
}

/**
 * status
 */
export interface StatusProperties {
  id: string
  type: 'status'
  status: {
    id: string
    name: string | 'private' | 'protected' | 'public'
    color: string
  }
}

/**
 * date
 */
export interface DateProperties {
  id: string
  type: 'date'
  date: {
    start: 'string' | null
    end: 'string' | null
    time_zone: 'string' | null
  }
}

/**
 * rich_text
 */
export interface RichTextProperties {
  id: string
  type: 'rich_text'
  rich_text: Array<RichTextChildren>
}

export class RichText {
  private rich_text: Array<RichTextChildren>
  constructor(rich_text: Array<RichTextChildren>) {
    this.rich_text = rich_text
  }

  toHTML() {
    let content = ''
    for (const text of this.rich_text) {
      if (text.annotations.code) {
        content = content + `<code>${text.plain_text}</code>`
      } else if (text.text.link !== null) {
        content =
          content + `<a href="${text.text.link.url}">${text.plain_text}</a>`
      } else if (text.annotations.color !== 'default') {
        content =
          content +
          `<span class="${text.annotations.color}">${text.plain_text}</span>`
      } else if (text.annotations.bold) {
        content = content + `<b>${text.plain_text}</b>`
      } else if (text.annotations.italic) {
        content = content + `<em>${text.plain_text}</em>`
      } else if (text.annotations.underline) {
        content = content + `<u>${text.plain_text}</u>`
      } else if (text.annotations.strikethrough) {
        content = content + `<del>${text.plain_text}</del>`
      } else {
        content = content + text.plain_text
      }
    }
    return content
  }
}

export interface RichTextChildren {
  type: string
  text: { content: string; link: { url: string } | null }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: string | null
}

/**
 * files
 */

export interface FilesProperties {
  id: string
  type: 'files'
  files: Array<{
    name: string
    type: string
    file: {
      url: string
      expiry_time: string
    }
  }>
}

/**
 * multi_select
 */
export interface MultiSelectProperties {
  id: string
  type: 'multi_select'
  multi_select: Array<{
    id: string
    name: string
    color: string
  }>
}

/**
 * unique_id
 */
export interface UniqueIdProperties {
  id: string
  type: 'unique_id'
  unique_id: {
    prefix: string | null
    number: number
  }
}

/**
 * title
 */
export interface TitleProperties {
  id: string
  type: 'title'
  title: Array<RichTextChildren>
}
