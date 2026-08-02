import { createTheme, DEFAULT_THEME, MantineProvider, mergeMantineTheme } from "@mantine/core";
import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  const theme = mergeMantineTheme(
    DEFAULT_THEME,
    createTheme({
      primaryColor: "teal",
      colors: {
        teal: [
          "#e6fcf5",
          "#c3fae8",
          "#96f2d7",
          "#63e6be",
          "#38d9a9",
          "#20c997",
          "#0ca678",
          "#099268",
          "#087f5b",
          "#066649",
        ],
      },
    }),
  );
  root.render(
    <React.StrictMode>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </React.StrictMode>,
  );
}
