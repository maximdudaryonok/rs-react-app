import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { Path } from '../../shared/types/routePaths'
import React from 'react'

vi.mock('../../pages/Main/Main', () => ({ Main: () => <div>Main Page</div> }))
vi.mock('../../pages/ControllForm/ControllForm', () => ({ ControllForm: () => <div>Controll Form Page</div> }))
vi.mock('../../pages/UncontrollForm/UncontrollForm', () => ({ UncontrollForm: () => <div>Uncontroll Form Page</div> }))

import { Path as RoutesPath } from '../../shared/types/routePaths'
import { Main } from '../../pages/Main/Main'
import { ControllForm } from '../../pages/ControllForm/ControllForm'
import { UncontrollForm } from '../../pages/UncontrollForm/UncontrollForm'
import { NotFound } from '../../pages/NotFound/NotFound'
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage'

const routes = [
  { path: RoutesPath.main, element: <Main />, errorElement: <ErrorPage /> },
  { path: RoutesPath.controlFrom, element: <ControllForm /> },
  { path: RoutesPath.unControlFrom, element: <UncontrollForm /> },
  { path: RoutesPath.notFound, element: <NotFound /> }
]

describe('RouteProvider routes', () => {
  it('renders Main page', () => {
    const router = createMemoryRouter(routes, { initialEntries: [Path.main] })
    render(<RouterProvider router={router} />)
    expect(screen.getByText(/Main Page/i)).toBeInTheDocument()
  })

  it('renders ControllForm page', () => {
    const router = createMemoryRouter(routes, { initialEntries: [Path.controlFrom] })
    render(<RouterProvider router={router} />)
    expect(screen.getByText(/Controll Form Page/i)).toBeInTheDocument()
  })

  it('renders UncontrollForm page', () => {
    const router = createMemoryRouter(routes, { initialEntries: [Path.unControlFrom] })
    render(<RouterProvider router={router} />)
    expect(screen.getByText(/Uncontroll Form Page/i)).toBeInTheDocument()
  })

})
