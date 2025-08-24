import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Main } from './Main'
import React from 'react'

vi.mock('./Main.module.css', () => ({
  default: {
    title: 'title',
    forms_wrapper: 'forms_wrapper',
    forms: 'forms',
    subtitle: 'subtitle'
  }
}))

vi.mock('../../shared/components/Details/Details', () => ({
  Details: vi.fn((props) => <div data-testid="details" data-active={props.active}>{props.name}</div>)
}))

vi.mock('../../app/redux/hooks/useAppSelector', () => ({
  useAppSelector: vi.fn()
}))

vi.mock('../../app/redux/selectors/formsSelectors', () => ({
  getControllForm: vi.fn(),
  getUnControllForm: vi.fn(),
  getFormsIdentificator: vi.fn()
}))


vi.mock('react-router-dom', () => ({
  Link: ({ to, children }: any) => <a href={to}>{children}</a>
}))

import { useAppSelector } from '../../app/redux/hooks/useAppSelector'
import { Details } from '../../shared/components/Details/Details'
import { Path } from '../../shared/types/routePaths'

describe('Main', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders links and title', () => {
    (useAppSelector as vi.Mock).mockImplementation((selectorFn: any) => {
      if (selectorFn.name === 'getControllForm') return []
      if (selectorFn.name === 'getUnControllForm') return []
      if (selectorFn.name === 'getFormsIdentificator') return null
      return []
    })

    render(<Main />)

    expect(screen.getByRole('link', { name: /^Controlled form$/i }))
      .toHaveAttribute('href', Path.controlFrom)
    expect(screen.getByRole('link', { name: /^UnControlled form$/i }))
      .toHaveAttribute('href', Path.unControlFrom)
    expect(screen.getByRole('heading', { name: /Main page/i }))
      .toBeInTheDocument()
  })
})
