import type { FC } from "react";
import type { SourceItemData } from "../types";
import { SourceItem } from "./SourceItem";

interface SourceListProperties {
  onSourceSelect?: (source: SourceItemData) => void;
  selectedName?: string;
  sources: SourceItemData[];
}

export const SourceList: FC<SourceListProperties> = ({
  onSourceSelect,
  selectedName,
  sources,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {sources.map(source => (
        <SourceItem
          isSelected={source.name === selectedName}
          key={source.name}
          name={source.name}
          onClick={() => onSourceSelect?.(source)}
          urlTemplate={source.urlTemplate}
        />
      ))}
    </div>
  );
};
