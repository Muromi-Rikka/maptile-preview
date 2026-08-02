# Task 3: Rsbuild Configuration

**Files:**

- Modify: `rsbuild.config.ts`

**Interfaces:**

- Produces: Updated Rsbuild config with Tailwind CSS plugin, no PostCSS config

**Steps:**

1. Update rsbuild.config.ts to use tailwindcss plugin:

```typescript
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginTailwindcss } from "@rsbuild/plugin-tailwindcss";

export default defineConfig({
  server: {
    port: 5555,
  },
  plugins: [
    pluginReact(),
    pluginTailwindcss(),
  ],
});
```

2. Remove postcss.config.ts if it exists:

```bash
rm -f postcss.config.ts postcss.config.js
```

3. Verify build works (note: build may still fail due to remaining Mantine imports, but the Rsbuild configuration itself should be correct):

```bash
pnpm build
```

4. Commit:

```bash
git add rsbuild.config.ts
git commit -m "build: use rsbuild tailwindcss plugin, remove postcss config"
```
