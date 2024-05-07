import React from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ModeToggle } from "./components/mode-togle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ModeToggle />,
  },
]);

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </ThemeProvider>
    </>
  );
}

export default App;
