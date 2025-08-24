import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NotFound } from './NotFound'

describe('NotFound', () => {
  it('renders the NotFound heading', () => {
    render(<NotFound />)
    const heading = screen.getByRole('heading', { name: /NotFound/i })
    expect(heading).toBeInTheDocument()
  })
})
