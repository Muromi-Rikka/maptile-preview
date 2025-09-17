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
      bg="dark.7"
      onClick={onClick}
      className="hover:bg-dark-6 hover:shadow-sm transition-all duration-150 cursor-pointer rounded-sm"
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
          c="gray.2"
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
