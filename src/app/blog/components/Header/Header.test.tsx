import { test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { Header } from './Header'

describe('Blog/Header component', () => {
  test('it renders without crashing', () => {
    render(<Header />)
  })
})
