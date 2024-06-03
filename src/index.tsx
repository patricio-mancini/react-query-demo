import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { makeServer } from './server';
import Root from './routes/root';
import { routeInfo } from './utils/constants';
import './index.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: routeInfo.transactions.path,
        element: routeInfo.transactions.element
      },
      {
        path: routeInfo.security.path,
        element: routeInfo.security.element
      },
      {
        path: '/',
        element: <Navigate to={routeInfo.transactions.path} />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

makeServer();
