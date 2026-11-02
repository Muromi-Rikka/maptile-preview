import { rentonReact } from "@renton/eslint-config-react";

export default rentonReact({
  jsonc: true,
  markdown: true,
  react: true,
  stylistic: {
    quotes: "double",
    semi: true,
  },
  tailwindcss: false,
  typescript: true,
  yaml: true,
}, {
  files: ["**/*.?([cm])[jt]s?(x)"],
  ignores: [".superpowers/**"],
  rules: {
    "react/set-state-in-effect": "off", // src/app.tsx:46/48 sources 拉取后同步默认底图状态
    "unicorn/filename-case": [
      "error",
      {
        cases: { kebabCase: true, pascalCase: true },
      },
    ], // React 组件文件按仓库约定 PascalCase
    "unicorn/name-replacements": "off", // shadcn components.json 固定 "@/lib/utils"；env.d.ts 为 Rsbuild 约定
  },
});
