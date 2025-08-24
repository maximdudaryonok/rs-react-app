import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { UncontrollForm } from './UncontrollForm'
import { Path } from '../../shared/types/routePaths'

vi.mock('../../shared/components/UncontrolledForm/UncontrolledForm', () => ({
  UncontrolledForm: () => <div data-testid="uncontrolled-form">Mock UncontrolledForm</div>
}))

vi.mock('react-router-dom', () => ({
  Link: ({ to, children }: any) => <a href={to}>{children}</a>
}))

describe('UncontrollForm', () => {
  it('renders link to main page', () => {
    render(<UncontrollForm />)
    const link = screen.getByRole('link', { name: /^Main$/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', Path.main)
  })

  it('renders heading', () => {
    render(<UncontrollForm />)
    const heading = screen.getByRole('heading', { name: /Uncontroll Form/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders UncontrolledForm component', () => {
    render(<UncontrollForm />)
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument()
  })
})
