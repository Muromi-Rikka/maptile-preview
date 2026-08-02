# Task 5: Entry Point Update

**Files:**

- Modify: `src/index.tsx`
- Modify: `index.html`

**Interfaces:**

- Produces: App wrapped with QueryClientProvider, dark mode class

**Steps:**

1. Update src/index.tsx to use QueryClientProvider instead of MantineProvider:

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./globals.css";

const queryClient = new QueryClient();

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
```

2. Update index.html to add dark class to html tag:

Find the `<html>` tag and add `class="dark"`:

```html
<html lang="zh-CN" class="dark">
```

3. Commit:

```bash
git add src/index.tsx index.html
git commit -m "feat: replace MantineProvider with QueryClientProvider"
```
