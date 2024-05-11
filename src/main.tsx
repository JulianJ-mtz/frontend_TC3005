import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login.tsx";
import ProtectedRoute from "./pages/protected-route.tsx";
import { AuthProvider } from "./auth/auth-provider.tsx";
import LayoutApp from "./Layout.tsx";
import { SignUp } from "./pages/signup.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "to-do",
        element: <div> hola </div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LayoutApp>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LayoutApp>
  </React.StrictMode>
);
