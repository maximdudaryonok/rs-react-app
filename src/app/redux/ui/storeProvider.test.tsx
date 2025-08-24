import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StoreProvider } from './StoreProvider'
import { useSelector } from 'react-redux'
import React from 'react'

const TestComponent = () => {
  const state = useSelector((state) => state)
  return <div data-testid="test-component">{JSON.stringify(state)}</div>
}

describe('StoreProvider', () => {
  it('renders children', () => {
    render(
      <StoreProvider>
        <div data-testid="child">Hello</div>
      </StoreProvider>
    )
    expect(screen.getByTestId('child')).toHaveTextContent('Hello')
  })

  it('provides the Redux store context to children', () => {
    render(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>
    )
    expect(screen.getByTestId('test-component')).toBeInTheDocument()
    expect(screen.getByTestId('test-component').textContent).toContain('{')
  })
})
