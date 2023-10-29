import { test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { Section3 } from './Section3'

describe('index page Section3 component', () => {
  test('it renders without crashing', () => {
    render(<Section3 />)
  })
})
