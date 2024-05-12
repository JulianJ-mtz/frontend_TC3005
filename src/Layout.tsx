import React from "react";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-togle";

interface LayoutProps {
  children: React.ReactNode;
}

function LayoutApp({ children }: LayoutProps) {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="absolute top-0 right-0 p-5">
          <ModeToggle />
        </div>
      </ThemeProvider>

      <main className="">{children}</main>
    </>
  );
}

export default LayoutApp;
