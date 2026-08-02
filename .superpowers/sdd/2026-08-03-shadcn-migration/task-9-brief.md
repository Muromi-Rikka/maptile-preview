# Task 9: Cleanup and Final Verification

**Files:**

- Remove: `postcss.config.ts` (if not already removed)
- Verify: All Mantine references removed

**Interfaces:**

- Produces: Clean codebase with no Mantine dependencies

**Steps:**

1. Search for remaining Mantine references:

```bash
grep -r "@mantine" src/ || true
grep -r "mantine" src/ || true
```

2. Remove any found references (update imports, remove unused code)

3. Run full build:

```bash
pnpm build
```

4. Run lint:

```bash
pnpm lint
```

5. Fix any lint issues:

```bash
pnpm lint:fix
```

6. Final commit:

```bash
git add -A
git commit -m "chore: cleanup mantine references and fix lint"
```
