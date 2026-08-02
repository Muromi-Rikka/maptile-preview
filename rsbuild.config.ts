import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginTailwindcss } from "@rsbuild/plugin-tailwindcss";

export default defineConfig({
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  server: {
    port: 5555,
  },
  plugins: [
    pluginReact(),
    pluginTailwindcss(),
  ],
});
