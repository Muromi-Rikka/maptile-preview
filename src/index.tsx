import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./globals.css";

const queryClient = new QueryClient();

const rootElement = document.querySelector("#root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
