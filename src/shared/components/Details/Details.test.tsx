import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest';
import { Details } from './Details'

vi.mock('./Details.module.css', () => ({
  default: {
    wrapper: 'wrapper',
    active: 'active',
    item_wrapper: 'item_wrapper',
    span: 'span',
    image: 'image'
  }
}))

describe('Details', () => {
  const props = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    gender: 'male',
    country: 'USA',
    file: 'test.png',
    password: 'Secret123!',
  }

  it('renders all provided details', () => {
    render(<Details {...props} />)
    expect(screen.getByText('Image:')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.png')
    expect(screen.getByText('Name:')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Email:')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('Password:')).toBeInTheDocument()
    expect(screen.getByText('Secret123!')).toBeInTheDocument()
    expect(screen.getByText('Gender:')).toBeInTheDocument()
    expect(screen.getByText('male')).toBeInTheDocument()
    expect(screen.getByText('Age:')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('Country:')).toBeInTheDocument()
    expect(screen.getByText('USA')).toBeInTheDocument()
  })

  it('applies active class when active prop is true', () => {
    const { container } = render(<Details {...props} active />)
    expect(container.firstChild).toHaveClass('wrapper active')
  })

  it('does not apply active class when active prop is false', () => {
    const { container } = render(<Details {...props} active={false} />)
    expect(container.firstChild).toHaveClass('wrapper')
    expect(container.firstChild).not.toHaveClass('active')
  })
})
