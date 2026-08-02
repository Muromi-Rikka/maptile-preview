# Task 1: Dependency Setup

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: Updated `package.json` with new dependencies

**Steps:**

1. Remove Mantine and related dependencies:
```bash
pnpm remove @mantine/core @mantine/hooks
pnpm remove -D postcss-preset-mantine postcss-simple-vars tailwind-preset-mantine @iconify/json @iconify/tailwind
```

2. Add new dependencies:
```bash
pnpm add @tanstack/react-query react-use lucide-react
pnpm add -D @rsbuild/plugin-tailwindcss
```

3. Verify dependencies installed:
```bash
pnpm install
```

4. Commit:
```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: replace mantine dependencies with shadcn ecosystem"
```
