import { test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { Side } from './Side'

describe('Blog/Side component', () => {
  test('it renders without crashing', () => {
    render(<Side />)
  })
})
