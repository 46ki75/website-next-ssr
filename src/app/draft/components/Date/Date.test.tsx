import { test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { Date as DateComponent } from './Date'

describe('Blog/Date component', () => {
  test('it renders without crashing', () => {
    render(
      <DateComponent
        createdAt={new Date().toISOString()}
        updatedAt={new Date().toISOString()}
      />
    )
  })
})
