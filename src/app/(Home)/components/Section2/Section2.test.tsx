import { test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { Section2 } from './Section2'

describe('index page Section2 component', () => {
  test('it renders without crashing', () => {
    render(<Section2 />)
  })
})
