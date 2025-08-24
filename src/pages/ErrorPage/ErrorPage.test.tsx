import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ErrorPage } from './ErrorPage'

describe('ErrorPage', () => {
  it('renders the ErrorPage heading', () => {
    render(<ErrorPage />)
    const heading = screen.getByRole('heading', { name: /ErrorPage/i })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
  })
})
