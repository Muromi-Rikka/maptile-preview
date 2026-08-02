# Task 4: Custom Hooks

**Files:**

- Create: `src/hooks/use-clipboard.ts`

**Interfaces:**

- Produces: `useClipboard()` hook with `{ copy: (text: string) => void, copied: boolean }` interface

**Steps:**

1. Create the use-clipboard hook:

```typescript
// src/hooks/use-clipboard.ts
import { useCopyToClipboard } from "react-use";

export function useClipboard() {
  const [copied, copyToClipboard] = useCopyToClipboard();

  return {
    copy: (text: string) => copyToClipboard(text),
    copied: copied.value ?? false,
  };
}
```

2. Commit:

```bash
git add src/hooks/use-clipboard.ts
git commit -m "feat: add useClipboard hook using react-use"
```
