import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./globals.css";

const queryClient = new QueryClient();

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
