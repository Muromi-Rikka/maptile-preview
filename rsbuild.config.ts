import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import tailwindcss from "@tailwindcss/postcss";

export default defineConfig({
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
  plugins: [pluginReact()],
  html: {
    template: "./index.html",
  },
});
