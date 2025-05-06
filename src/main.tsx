import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharacterDetails from "./pages/dashboard/CharacterDetails";

import ReactDOM from "react-dom/client";
import DataEnrichment from "./pages/dashboard/DataEnrichment";
import App from "./App";
import Login from "./pages/loginPage/Login";
import Signup from "./pages/loginPage/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";


export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },

      // ✅ Protected routes
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <CharacterDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/enrichment/:id",
        element: (
          <PrivateRoute>
            <DataEnrichment />
          </PrivateRoute>
        ),
      },

      {
        path: "*",
        element: <div>404 - Page Not Found</div>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
