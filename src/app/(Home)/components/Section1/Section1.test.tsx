import { test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { Section1 } from './Section1'

describe('index page Section1 component', () => {
  test('it renders without crashing', () => {
    render(<Section1 />)
  })
})
