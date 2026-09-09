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
  ignores: [".superpowers/**"],
  rules: {
    "pnpm/yaml-enforce-settings": "off",
    "react/set-state-in-effect": "off",
    "unicorn/filename-case": "off",
    "unicorn/name-replacements": "off",
    "unicorn/no-computed-property-existence-check": "off",
    "unicorn/prefer-await": "off",
    "unicorn/prefer-simple-condition-first": "off",
  },
});
