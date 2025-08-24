import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

vi.mock('../PasswordStrength/PasswordStrength', () => ({
  PasswordStrength: () => <div data-testid="password-strength" />
}))

vi.mock('../../../app/redux/hooks/useAppDispatch', () => ({
  useAppDispatch: () => vi.fn()
}))

vi.mock('../../../app/redux/hooks/useAppSelector', () => ({
  useAppSelector: (fn: any) => fn()
}))

vi.mock('../../../app/redux/selectors/countriesSelectors', () => ({
  getCountries: () => ({ countries: ['Belarus', 'Poland'] })
}))

vi.mock('../../../app/redux/slices/formsSlice', () => ({
  addFUnControllForm: vi.fn((payload) => ({ type: 'add', payload }))
}))

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}))

vi.mock('../../../shared/lib/utils/helpers', () => ({
  imageToBase64: vi.fn(() => Promise.resolve('base64string'))
}))

vi.mock('./UncontrolledForm.module.css', () => ({
  default: {
    form: 'form',
    input: 'input',
    errors: 'errors',
    marginBottom: 'marginBottom',
    submit: 'submit'
  }
}))

import { UncontrolledForm } from './UncontrolledForm'
import { addFUnControllForm } from '../../../app/redux/slices/formsSlice'
import { imageToBase64 } from '../../lib/utils/helpers.ts'

const dummyReducer = (state = {}, action: any) => state

const renderWithProvider = (ui: React.ReactNode) => {
  const store = configureStore({
    reducer: {
      forms: dummyReducer,
      countries: () => ({ countries: ['Belarus', 'Poland'] })
    }
  })
  return render(<Provider store={store}>{ui}</Provider>)
}

describe('UncontrolledForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all fields and countries list', () => {
    renderWithProvider(<UncontrolledForm />)
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Male/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Female/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/I accept Terms/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Upload picture/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument()
    expect(screen.getByText('Belarus')).toBeInTheDocument()
    expect(screen.getByText('Poland')).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    renderWithProvider(<UncontrolledForm />)

    fireEvent.input(screen.getByLabelText(/Name/i), { target: { value: 'John' } })
    fireEvent.input(screen.getByLabelText(/Age/i), { target: { value: '30' } })
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } })
    fireEvent.input(screen.getByLabelText(/^Password$/i), { target: { value: 'Aa1!' } })
    fireEvent.input(screen.getByLabelText(/Confirm Password/i), { target: { value: 'Aa1!' } })
    fireEvent.click(screen.getByLabelText(/Male/i))
    fireEvent.click(screen.getByLabelText(/I accept Terms/i))

    const file = new File(['dummy'], 'test.png', { type: 'image/png' })
    fireEvent.change(screen.getByLabelText(/Upload picture/i), { target: { files: [file] } })

    fireEvent.input(screen.getByLabelText(/Country/i), { target: { value: 'Belarus' } })

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }))

    await waitFor(() => {
      expect(imageToBase64).toHaveBeenCalled()
      expect(addFUnControllForm).toHaveBeenCalled()
    })
  })

  it('shows validation errors when submitting empty form', async () => {
    renderWithProvider(<UncontrolledForm />)
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }))
    await waitFor(() => {
      expect(
        screen.getAllByText((content) => content.toLowerCase().includes('required')).length
      ).toBeGreaterThan(0)
    })
  })
})
