import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import { useLocalStorage } from './useLocalStorage'

function HookTester<T>({hook,onRender}:{hook: () => [T, (val: T) => void]
  onRender: (value: T, setter: (val: T) => void) => React.ReactNode
}) {
  const [value, setValue] = hook()
  return <>{onRender(value, setValue)}</>
}

describe('useLocalStorage', () => {
  const KEY = 'test-key'

  beforeEach(() => {
    window.localStorage.clear()
    vi.restoreAllMocks()
  })

  it('falls back to initial if nothing in localStorage', () => {
    render(
      <HookTester
        hook={() => useLocalStorage<string>(KEY, 'hello')}
    onRender={(value) => <span>{value}</span>}
    />
  )
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

    it('reads existing JSON from localStorage', () => {
      window.localStorage.setItem(KEY, JSON.stringify('world'))
      render(
        <HookTester
          hook={() => useLocalStorage<string>(KEY, 'hello')}
      onRender={(value) => <span>{value}</span>}
      />
    )
      expect(screen.getByText('world')).toBeInTheDocument()
    })

      it('updates state & localStorage when setter is called', async () => {
        render(
          <HookTester
            hook={() => useLocalStorage<number>(KEY, 0)}
        onRender={(value, setValue) => (
          <>
            <button onClick={() => setValue(42)}>set</button>
        <span>{value}</span>
        </>
      )}
        />
      )

        expect(screen.getByText('0')).toBeInTheDocument()

        await userEvent.click(screen.getByRole('button', { name: 'set' }))

        expect(screen.getByText('42')).toBeInTheDocument()
        expect(window.localStorage.getItem(KEY)).toBe('42')
      })
    })
