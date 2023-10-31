import axios from 'axios'
import variables from '@/variables'
import { RichText } from '@/models/backend/notion'

/**
 * An asynchronous function to retrieve a page from a blog post slug.
 */
async function getPageBySlug(slug: string): Promise<any> {
  const response = await axios.post(
    `https://api.notion.com/v1/databases/${variables.notion.database.blog}/query`,
    {
      filter: {
        and: [
          {
            property: 'slug',
            unique_id: {
              equals: Number(slug)
            }
          }
        ]
      }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28'
      }
    }
  )

  if (response.data.results.length === 0) {
    throw new Error('no such record')
  }
  return response.data
}

/**
 * An asynchronous function to recursively retrieve Notion blocks of a blog post.
 */
async function getContentById(id: string) {
  let hasMore = true
  let nextCursor: string | null = null
  const blocks = []
  while (hasMore) {
    const response: any = await axios.get(
      `https://api.notion.com/v1/blocks/${id}/children`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28'
        },
        params: { page_size: 100, start_cursor: nextCursor }
      }
    )
    for (const element of response.data.results) {
      blocks.push(element)
    }

    hasMore = response.data.has_more
    nextCursor = response.data.next_cursor
  }

  return blocks
}

async function getChildBlocks(blocks: Array<any>) {
  for (const [index, element] of blocks.entries()) {
    if (element.type === 'table') {
      const response: any = await axios.get(
        `https://api.notion.com/v1/blocks/${element.id}/children`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
            'Notion-Version': '2022-06-28'
          },
          params: { page_size: 100 }
        }
      )
      const tableRow = response.data.results.map(
        (element: any) => element.table_row
      )
      blocks[index].table.children = tableRow
    } else if (element.type === 'toggle') {
      // TODO: implement get toggle children
      const response: any = await axios.get(
        `https://api.notion.com/v1/blocks/${element.id}/children`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
            'Notion-Version': '2022-06-28'
          },
          params: { page_size: 100 }
        }
      )
      const roggleChildren = response.data.results.map(
        (element: any) => element
      )
      blocks[index].toggle.children = roggleChildren
    }
  }
  return blocks
}

function convertBlocksToHTML(blocks: Array<any>) {
  let ulFlag = false
  let olFlag = false

  for (const [index, element] of blocks.entries()) {
    switch (element.type) {
      case 'paragraph':
        const p = new RichText(blocks[index].paragraph.rich_text).toHTML()
        blocks[index] = `<p>${p}</p>`
        break

      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
        const h = new RichText(
          blocks[index][blocks[index].type].rich_text
        ).toHTML()
        const level = blocks[index].type.slice(-1)
        blocks[index] = `<h${level}>${h}</h${level}>`

        break

      case 'code':
        // TODO: implement caption
        const code = blocks[index].code.rich_text[0].text.content
        const language = blocks[index].code.language
        const codeblock = `<pre class="language-${language}"><code class="language-${language}">${code}</code></pre>`
        blocks[index] = codeblock
        break

      case 'image':
        // TODO: implement caption
        const src = blocks[index].image.file.url
        const alt = ''
        const image = `<img src="${src}" alt="${alt}" />`
        blocks[index] = image
        break

      case 'bulleted_list_item':
        const ulli = new RichText(
          blocks[index].bulleted_list_item.rich_text
        ).toHTML()
        if (ulFlag) {
          blocks[index] = `<li>${ulli}</li>`
        } else {
          ulFlag = true
          blocks[index] = `<ul><li>${ulli}</li>`
        }

        break

      case 'numbered_list_item':
        const olli = new RichText(
          blocks[index].numbered_list_item.rich_text
        ).toHTML()
        if (olFlag) {
          blocks[index] = `<li>${olli}</li>`
        } else {
          olFlag = true
          blocks[index] = `<ol><li>${olli}</li>`
        }
        break

      case 'divider':
        blocks[index] = '<hr />'
        break

      case 'quote':
        const blockquote = new RichText(blocks[index].quote.rich_text).toHTML()
        blocks[index] = `<blockquote>${blockquote}</blockquote>`
        break

      case 'callout':
        const callout = new RichText(blocks[index].callout.rich_text).toHTML()
        const color = blocks[index].callout.color.split('_').shift()
        blocks[index] = `<div class="callout-${color}">${callout}</div>`
        break

      case 'table':
        let tableRow = []
        for (const row of blocks[index].table.children) {
          let tr = ''
          for (const cell of row.cells) {
            let td = `<td>${new RichText(cell).toHTML()}</td>`
            tr = tr + td
          }
          tableRow.push(`<tr>${tr}</tr>`)
        }
        let thead = `<thead>${tableRow.shift()}</thead>`
        thead = thead.replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>')
        const tbody = `<tbody>${tableRow.join('')}</tbody>`
        const table = `<table>${thead}${tbody}</table>`

        blocks[index] = table

        break

      case 'toggle':
        const toggleCaption = new RichText(
          blocks[index].toggle.rich_text
        ).toHTML()
        const toggleContent = convertBlocksToHTML(blocks[index].toggle.children)

        blocks[
          index
        ] = `<div class="toggle-container"><div class="toggle-caption">${toggleCaption}</div><div class="toggle-content">${toggleContent}</div></div>`
        break

      default:
        break
    }

    switch (element.type) {
      case 'bulleted_list_item':
        if (olFlag) {
          olFlag = false
          blocks[index] = '</ol>' + blocks[index]
        }
        break
      case 'numbered_list_item':
        if (ulFlag) {
          ulFlag = false
          blocks[index] = '</ul>' + blocks[index]
        }
        break
      default:
        if (olFlag) {
          olFlag = false
          blocks[index] = '</ol>' + blocks[index]
        }

        if (ulFlag) {
          ulFlag = false
          blocks[index] = '</ul>' + blocks[index]
        }
        break
    }
  }

  return blocks.join('')
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await getPageBySlug(params.slug)
    const [result] = data.results

    let blocks = await getContentById(result.id)
    blocks = await getChildBlocks(blocks)
    const HTML = convertBlocksToHTML(blocks)

    const blog = {
      slug: result.properties.slug.unique_id.number,
      title: result.properties.title.title
        .map((item: any) => item.plain_text)
        .join(''),
      description: result.properties.description.rich_text
        .map((item: any) => item.plain_text)
        .join(''),
      ogpImage: '/images/common/noimage_ogp.webp',
      tags: result.properties.tags.multi_select,
      createdAt: new Date(result.properties.createdAt.date.start).toISOString(),
      updatedAt: new Date(result.properties.updatedAt.date.start).toISOString(),
      content: HTML
    }
    if (result.properties.ogpImage.files.length !== 0) {
      blog.ogpImage =
        '/api/notion/blog/image/' + result.properties.slug.unique_id.number
    }

    return Response.json(blog)
  } catch (error) {
    return Response.json({ message: 'No record found' })
  }
}
