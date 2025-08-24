import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./PasswordStrength.module.css', () => ({
  default: {
    wrapper: 'wrapper',
    progress: 'progress',
    label: 'label'
  }
}))

vi.mock('../../../shared/types/validation', () => ({
  PASSWORD_STRENGTH_COLORS: [
    'rgb(255, 0, 0)',
    'rgb(255, 165, 0)',
    'rgb(255, 255, 0)',
    'rgb(0, 128, 0)'
  ]
}))

vi.mock('../../../shared/lib/utils/helpers', () => ({
  getPasswordStrength: vi.fn()
}))

import { PASSWORD_STRENGTH_COLORS } from '../../../shared/types/validation'
import { getPasswordStrength } from '../../../shared/lib/utils/helpers'
import { PasswordStrength } from './PasswordStrength'
import style from './PasswordStrength.module.css'

const mockedGetPasswordStrength = getPasswordStrength;

describe('PasswordStrength', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders "Very weak" when strength is 0', () => {
    mockedGetPasswordStrength.mockReturnValue(0)
    const { container } = render(<PasswordStrength password="" />)
    expect(screen.getByText(/Very weak/i)).toBeInTheDocument()
    const progress = container.querySelector(`.${style.progress}`) as HTMLElement
    expect(progress).toHaveStyle({ width: '1%' })
  })

  it('renders "Weak" with correct color and width', () => {
    mockedGetPasswordStrength.mockReturnValue(2)
    const { container } = render(<PasswordStrength password="abc" />)
    const label = screen.getByText(/Weak/i)
    expect(label).toHaveStyle({ color: PASSWORD_STRENGTH_COLORS[1] })
    const progress = container.querySelector(`.${style.progress}`) as HTMLElement
    expect(progress).toHaveStyle({ width: '50%', backgroundColor: PASSWORD_STRENGTH_COLORS[1] })
  })

  it('renders "Medium" with correct color and width', () => {
    mockedGetPasswordStrength.mockReturnValue(3)
    const { container } = render(<PasswordStrength password="Abc1" />)
    const label = screen.getByText(/Medium/i)
    expect(label).toHaveStyle({ color: PASSWORD_STRENGTH_COLORS[2] })
    const progress = container.querySelector(`.${style.progress}`) as HTMLElement
    expect(progress).toHaveStyle({ width: '75%', backgroundColor: PASSWORD_STRENGTH_COLORS[2] })
  })

  it('renders "Strong" with correct color and width', () => {
    mockedGetPasswordStrength.mockReturnValue(4)
    const { container } = render(<PasswordStrength password="Aa1!" />)
    const label = screen.getByText(/Strong/i)
    expect(label).toHaveStyle({ color: PASSWORD_STRENGTH_COLORS[3] })
    const progress = container.querySelector(`.${style.progress}`) as HTMLElement
    expect(progress).toHaveStyle({ width: '100%', backgroundColor: PASSWORD_STRENGTH_COLORS[3] })
  })
})
