import { describe, it, expect } from 'vitest'
import { countryList } from '../../../shared/types/countries'
import { countriesReducer, CountryState } from './countrySlice.ts';


describe('countriesReducer', () => {
  it('should return the initial state when passed an unknown action', () => {
    const initialState = countriesReducer(undefined, { type: 'unknown' })
    expect(initialState).toEqual<CountryState>({
      countries: countryList
    })
  })

  it('should keep the same state for unknown actions', () => {
    const prevState: CountryState = { countries: ['Belarus', 'Poland'] }
    const newState = countriesReducer(prevState, { type: 'unknown' })
    expect(newState).toBe(prevState)
  })
})
