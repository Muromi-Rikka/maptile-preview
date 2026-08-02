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
      fontFamily: "var(--font-sans)",
      fontFamilyMonospace: "var(--font-mono)",
      colors: {
        dark: [
          "#C1C2C5",
          "#A6A7AB",
          "#909296",
          "#5C5F66",
          "#373A40",
          "#2C2E33",
          "#25262B",
          "#1A1B1E",
          "#141517",
          "#101113",
        ],
      },
      primaryColor: "dark",
      components: {
        Button: {
          defaultProps: {
            variant: "subtle",
          },
        },
        Card: {
          defaultProps: {
            radius: "md",
          },
        },
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
