import type { FC } from "react";
import { Box, Image, Text } from "@mantine/core";

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
    <Box
      bg={isSelected ? "dark.4" : "dark.7"}
      onClick={onClick}
      style={{
        borderLeft: isSelected ? "3px solid var(--mantine-color-teal-6)" : "3px solid transparent",
        boxShadow: isSelected ? "0 0 12px var(--color-teal-glow)" : "none",
      }}
      className="hover:bg-dark-6 hover:shadow-sm transition-all duration-150 cursor-pointer rounded-sm hover:scale-[1.03]"
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
          c={isSelected ? "teal.4" : "gray.2"}
          ta="center"
          fw={500}
          truncate
          lh={1.2}
        >
          {name}
        </Text>
      </Box>
    </Box>
  );
};
