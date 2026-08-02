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
