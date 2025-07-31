import {
  createBrowserRouter,
  isRouteErrorResponse,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import { Paths } from 'models/routerTypes';
import { SearchPage, Layout } from 'pages';
import { ErrorElement } from '../../../components/ErrorBoundary/ui/ErrorElement.tsx';
import { GetData } from '../../../utils/api/get-data.ts';

function ErrorBoundaryWrapper() {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
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
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const query = url.searchParams.get('query') ?? '';
          const page = parseInt(url.searchParams.get('page') ?? '1', 10);
          const data = await GetData(query, page);

          return { data, query, page };
        },
        children: [
          {
            path: `${Paths.hero}:id`,
            lazy: async () => {
              const { Hero } = await import('pages/index.ts');

              return {
                Component: Hero,
                errorElement: <ErrorBoundaryWrapper />,
              };
            },
          },
        ],
      },
      {
        path: Paths.notFound,
        lazy: async () => {
          const { NotFound } = await import('pages/index.ts');

          return {
            Component: NotFound,
            errorElement: <ErrorBoundaryWrapper />,
          };
        },
      },
      {
        path: Paths.about,
        lazy: async () => {
          const { About } = await import('pages/index.ts');

          return {
            Component: About,
            errorElement: <ErrorBoundaryWrapper />,
          };
        },
      },
    ],
  },
]);

export const RouteProvider = () => {
  return <RouterProvider router={router} />;
};

export { router };
