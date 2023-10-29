import { test, describe } from 'vitest'
import { render } from '@testing-library/react'
import { Background } from './Background'
import { StaticImageData } from 'next/image'

describe('index page Section1 component', () => {
  test('it renders without crashing', () => {
    const dummySrc: StaticImageData = {
      src: '/images/dummy-src.jpg',
      height: 0,
      width: 0
    }
    render(<Background {...dummySrc} />)
  })
})
