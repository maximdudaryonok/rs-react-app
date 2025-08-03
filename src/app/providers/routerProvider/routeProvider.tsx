import { createBrowserRouter, isRouteErrorResponse, RouterProvider, useRouteError } from 'react-router-dom';
import { Paths } from 'models/routerTypes';
import { SearchPage, Layout, Hero, NotFound, About } from 'pages';
import { ErrorElement } from '../../../components/ErrorBoundary/ui/ErrorElement.tsx';
import type { FC } from 'react';

function ErrorBoundaryWrapper() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'Unknown route error';
  }

  return <ErrorElement errorInfo={errorMessage} />;
}

const router = createBrowserRouter([
  {
    path: Paths.base,
    element: <Layout />,
    errorElement: <ErrorBoundaryWrapper />,
    children: [
      {
        path: Paths.base,
        element: <SearchPage />,
        children: [
          {
            path: `${Paths.hero}:id`,
            element: <Hero />,
            errorElement: <ErrorBoundaryWrapper />,
          },
        ],
      },
      {
        path: Paths.notFound,
        element: <NotFound />,
      },
      {
        path: Paths.about,
        element: <About />,
      },
    ],
  },
]);

const RouteProvider: FC = () => {
  return <RouterProvider router={router} />;
};

export { RouteProvider };
