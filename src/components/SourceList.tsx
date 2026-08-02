import type { FC } from "react";
import type { SourceItemData } from "../types";
import { Box, SimpleGrid } from "@mantine/core";
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
    <Box>
      <SimpleGrid cols={2} spacing="xs">
        {sources.map(source => (
          <SourceItem
            key={source.name}
            name={source.name}
            urlTemplate={source.urlTemplate}
            isSelected={source.name === selectedName}
            onClick={() => onSourceSelect?.(source)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
