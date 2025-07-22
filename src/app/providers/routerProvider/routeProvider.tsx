import { JSX } from 'react';
import { SearchPage, Layout } from 'pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Paths } from 'models/routerTypes.ts';
import { ErrorElement } from '../../../components/errorBoundary';

const router = createBrowserRouter([
  {
    path: Paths.base,
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: Paths.base,
        element: <SearchPage />,
      },
    ],
  },
]);

const RouteProvider: () => JSX.Element = () => {
  return <RouterProvider router={router} />;
};

export { RouteProvider };
