import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'


vi.mock('../PasswordStrength/PasswordStrength', () => ({
  PasswordStrength: () => <div data-testid="password-strength" />
}))

vi.mock('app/redux/selectors/countriesSelectors', () => ({
  getCountries: () => ({ countries: ['Belarus', 'Poland'] })
}))

vi.mock('../../../app/redux/slices/formsSlice', () => ({
  addFControllForm: vi.fn((payload) => ({ type: 'add', payload }))
}))

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}))

vi.mock('../../../shared/lib/utils/helpers', () => ({
  imageToBase64: vi.fn(() => Promise.resolve('base64string'))
}))

vi.mock('./Form.module.css', () => ({
  default: {
    form: 'form',
    input: 'input',
    errors: 'errors',
    marginBottom: 'marginBottom',
    submit: 'submit'
  }
}))

import { Form } from './Form'
import { addFControllForm } from '../../../app/redux/slices/formsSlice'
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

describe('Form', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all fields and countries list', () => {
    renderWithProvider(<Form />)
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

})
