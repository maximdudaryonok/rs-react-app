import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ControllForm } from './ControllForm'
import { Path } from '../../shared/types/routePaths'
import React from 'react'

vi.mock('../../shared/components/Form/Form', () => ({
  Form: () => <div data-testid="form-component">Mock Form</div>
}))

vi.mock('react-router-dom', () => ({
  Link: ({ to, children }: any) => <a href={to}>{children}</a>
}))

describe('ControllForm', () => {
  it('renders link to main page', () => {
    render(<ControllForm />)
    const link = screen.getByRole('link', { name: /^Main$/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', Path.main)
  })

  it('renders heading', () => {
    render(<ControllForm />)
    const heading = screen.getByRole('heading', { name: /React Hook Forms/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders Form component', () => {
    render(<ControllForm />)
    expect(screen.getByTestId('form-component')).toBeInTheDocument()
  })
})
