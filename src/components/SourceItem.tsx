import type { FC } from "react";
import { Check } from "lucide-react";
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
      .replace("{x}", "213")
      .replace("{y}", "107")
      .replace("{z}", "8");
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer rounded-md overflow-hidden transition-all duration-200",
        "border-2 active:scale-[0.97]",
        isSelected
          ? "border-primary shadow-md shadow-primary/20 ring-1 ring-primary/30"
          : "border-border hover:border-muted-foreground/50 hover:shadow-sm",
      )}
    >
      <img
        src={getPreviewUrl()}
        alt={name}
        className="h-[60px] w-full object-cover"
      />
      <div
        className={cn(
          "px-1.5 py-1 transition-colors duration-200",
          isSelected ? "bg-primary/10" : "bg-card",
        )}
      >
        <p
          className={cn(
            "text-xs font-medium text-center truncate leading-tight",
            isSelected ? "text-primary font-semibold" : "text-muted-foreground",
          )}
        >
          {name}
        </p>
      </div>
      {isSelected && (
        <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm">
          <Check className="h-3 w-3" strokeWidth={3} />
        </div>
      )}
    </div>
  );
};
