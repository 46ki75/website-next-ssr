import { test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { Main } from './Main'
import { Blog } from '@/models'

const blogTopProps: Blog = {
  slug: 'blog',
  title: 'ブログ',
  description: 'ブログトップ',
  ogpImage: '/images/common/noimage_ogp.webp',
  tags: [],
  createdAt: new Date('2022-10-01').toISOString(),
  updatedAt: new Date('2023-10-29').toISOString(),
  content: ''
}

describe('Blog/Main component', () => {
  test('it renders without crashing', () => {
    render(<Main {...blogTopProps} />)
  })
})
