# Task 7: SourceItem Component Rewrite

**Files:**

- Modify: `src/components/SourceItem.tsx`

**Interfaces:**

- Produces: Same `SourceItemProps` interface, no breaking changes

**Steps:**

1. Rewrite SourceItem.tsx with Tailwind CSS:

```typescript
import type { FC } from "react";
import { cn } from "../lib/utils";

interface SourceItemProps {
  name: string;
  urlTemplate: string;
  previewUrl?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const SourceItem: FC<SourceItemProps> = ({
  name,
  urlTemplate,
  previewUrl,
  isSelected = false,
  onClick,
}) => {
  const getPreviewUrl = () => {
    if (previewUrl)
      return previewUrl;
    return urlTemplate
      .replace("{x}", "13662")
      .replace("{y}", "6749")
      .replace("{z}", "14");
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-sm transition-all duration-150 hover:scale-[1.03] hover:shadow-sm",
        isSelected
          ? "bg-accent border-l-3 border-primary shadow-[0_0_12px_var(--primary)]"
          : "bg-card border-l-3 border-transparent hover:bg-accent/50",
      )}
    >
      <img
        src={getPreviewUrl()}
        alt={name}
        className="h-[60px] w-full object-cover rounded-t-sm"
      />
      <div className="p-1.5">
        <p
          className={cn(
            "text-xs font-medium text-center truncate leading-tight",
            isSelected ? "text-primary" : "text-foreground",
          )}
        >
          {name}
        </p>
      </div>
    </div>
  );
};
```

2. Commit:

```bash
git add src/components/SourceItem.tsx
git commit -m "feat: rewrite SourceItem with shadcn styling"
```
