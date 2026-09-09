import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import tailwindcss from "@tailwindcss/postcss";

export default defineConfig({
  html: {
    template: "./index.html",
  },
  plugins: [pluginReact()],
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  server: {
    port: 5555,
  },
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [tailwindcss],
      },
    },
  },
});
