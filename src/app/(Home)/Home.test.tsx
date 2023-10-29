import { expect, test, describe } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Home from './page'

describe('Home component', () => {
  test('it renders without crashing', () => {
    render(<Home />)
    // const main = within(screen.getByRole('main'))
    // expect(main.getByRole('heading', { level: 2, name: /Docs/i })).toBeDefined()
  })
})
