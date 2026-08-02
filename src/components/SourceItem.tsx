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
        backgroundColor: "var(--color-muted)",
        cursor: "pointer",
        borderRadius: "var(--mantine-radius-sm)",
        transition: "all var(--transition-fast)",
        border: "1px solid transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-secondary)";
        e.currentTarget.style.borderColor = "var(--color-border)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--color-muted)";
        e.currentTarget.style.borderColor = "transparent";
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
          style={{ color: "var(--color-foreground)" }}
        >
          {name}
        </Text>
      </Box>
    </Box>
  );
};
