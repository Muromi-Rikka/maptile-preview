import type { FC } from "react";
import { Box, Image, Text } from "@mantine/core";

interface SourceItemProps {
  name: string;
  urlTemplate: string;
  previewUrl?: string;
  onClick?: () => void;
}

export const SourceItem: FC<SourceItemProps> = ({
  name,
  urlTemplate,
  previewUrl,
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
    <Box
      onClick={onClick}
      style={{
        backgroundColor: "var(--color-ocean)",
        cursor: "pointer",
        borderRadius: "var(--mantine-radius-sm)",
        transition: "all var(--transition-fast)",
        border: "1px solid var(--color-grid)",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-coordinate)";
        e.currentTarget.style.backgroundColor = "var(--color-land)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-grid)";
        e.currentTarget.style.backgroundColor = "var(--color-ocean)";
      }}
    >
      <Image
        src={getPreviewUrl()}
        alt={name}
        height={60}
        fit="cover"
        radius="xs"
      />
      <Box p={6}>
        <Text
          size="xs"
          ta="center"
          fw={500}
          truncate
          lh={1.2}
          style={{
            color: "var(--color-annotation)",
            fontFamily: "var(--font-body)",
          }}
        >
          {name}
        </Text>
      </Box>
    </Box>
  );
};
