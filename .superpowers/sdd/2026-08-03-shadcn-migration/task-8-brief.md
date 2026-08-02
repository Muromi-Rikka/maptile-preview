# Task 8: SourceList Component Rewrite

**Files:**

- Modify: `src/components/SourceList.tsx`

**Interfaces:**

- Consumes: `SourceItem` from Task 7
- Produces: Same `SourceListProps` interface, no breaking changes

**Steps:**

1. Rewrite SourceList.tsx with Tailwind CSS:

```typescript
import type { FC } from "react";
import type { SourceItemData } from "../types";
import { SourceItem } from "./SourceItem";

interface SourceListProps {
  sources: SourceItemData[];
  selectedName?: string;
  onSourceSelect?: (source: SourceItemData) => void;
}

export const SourceList: FC<SourceListProps> = ({
  sources,
  selectedName,
  onSourceSelect,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {sources.map(source => (
        <SourceItem
          key={source.name}
          name={source.name}
          urlTemplate={source.urlTemplate}
          isSelected={source.name === selectedName}
          onClick={() => onSourceSelect?.(source)}
        />
      ))}
    </div>
  );
};
```

2. Commit:

```bash
git add src/components/SourceList.tsx
git commit -m "feat: rewrite SourceList with shadcn styling"
```
