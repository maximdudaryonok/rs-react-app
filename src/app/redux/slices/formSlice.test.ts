import { describe, it, expect } from 'vitest'
import {
  formsReducer,
  addFControllForm,
  addFUnControllForm,
  Identificator
} from './formsSlice'
import type { formsSchema } from './formsSlice'

const mockForm: any = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
  password: 'Aa1!',
  confirm: 'Aa1!',
  gender: 'male',
  terms: true,
  file: 'base64string',
  country: 'Belarus'
}

describe('formsSlice reducer', () => {
  it('should return the initial state when passed an unknown action', () => {
    const initialState = formsReducer(undefined, { type: 'unknown' })
    expect(initialState).toEqual<formsSchema>({
      controllForm: [],
      unControlledForm: [],
      lastFormId: null
    })
  })

  it('should handle addFControllForm', () => {
    const state = formsReducer(undefined, addFControllForm(mockForm))
    expect(state.controllForm).toHaveLength(1)
    expect(state.controllForm[0]).toEqual(mockForm)
    expect(state.lastFormId).toBe(Identificator.controlled)
    expect(state.unControlledForm).toHaveLength(0)
  })

  it('should handle addFUnControllForm', () => {
    const state = formsReducer(undefined, addFUnControllForm(mockForm))
    expect(state.unControlledForm).toHaveLength(1)
    expect(state.unControlledForm[0]).toEqual(mockForm)
    expect(state.lastFormId).toBe(Identificator.uncontrolled)
    expect(state.controllForm).toHaveLength(0)
  })

  it('should append to existing controllForm', () => {
    const prevState: formsSchema = {
      controllForm: [mockForm],
      unControlledForm: [],
      lastFormId: null
    }
    const newForm = { ...mockForm, name: 'Jane Doe' }
    const state = formsReducer(prevState, addFControllForm(newForm))
    expect(state.controllForm).toHaveLength(2)
    expect(state.controllForm[1]).toEqual(newForm)
    expect(state.lastFormId).toBe(Identificator.controlled)
  })

  it('should append to existing unControlledForm', () => {
    const prevState: formsSchema = {
      controllForm: [],
      unControlledForm: [mockForm],
      lastFormId: null
    }
    const newForm = { ...mockForm, name: 'Jane Doe' }
    const state = formsReducer(prevState, addFUnControllForm(newForm))
    expect(state.unControlledForm).toHaveLength(2)
    expect(state.unControlledForm[1]).toEqual(newForm)
    expect(state.lastFormId).toBe(Identificator.uncontrolled)
  })
})
