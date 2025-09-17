import type { SourceItemData } from "./types/source";
import { Box, Button, Card, Group, ScrollArea, Text, Title } from "@mantine/core";
import { useClipboard, useFetch } from "@mantine/hooks";
import { clsx } from "clsx";
import { useEffect, useMemo, useState } from "react";
import { MapView } from "./components/MapView";
import { SourceList } from "./components/SourceList";
import "./globals.css";

function App() {
  const { data: sources } = useFetch<SourceItemData[]>("/sources.json");
  const [currentSourceUrl, setCurrentSourceUrl] = useState<string>("");
  const clipboard = useClipboard();

  // Group sources by title
  const groupedSources = useMemo(() => {
    if (!sources)
      return {};
    return sources.reduce((acc, source) => {
      if (!acc[source.title]) {
        acc[source.title] = [];
      }
      acc[source.title].push(source);
      return acc;
    }, {} as Record<string, SourceItemData[]>);
  }, [sources]);

  // Set default source to first GCJ02 source when data loads
  useEffect(() => {
    if (sources && sources.length > 0 && !currentSourceUrl) {
      const gcj02Source = sources.find(s => s.title === "GCJ02");
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setCurrentSourceUrl(gcj02Source?.urlTemplate || sources[0].urlTemplate);
    }
  }, [currentSourceUrl, sources]);

  const handleSourceSelect = (source: SourceItemData) => {
    setCurrentSourceUrl(source.urlTemplate);
  };

  return (
    <Box className="w-screen h-screen bg-gray-900 p-3 pr-1 flex flex-row justify-start items-stretch gap-3">
      <Box className="flex-1 flex flex-col gap-3">
        {currentSourceUrl && (
          <Card
            bg="dark.8"
            c="gray.3"
            p="sm"
            radius="md"
          >
            <Group justify="space-between" mb={4}>
              <Text size="xs" fw={500} c="gray.1">当前底图URL:</Text>
              <Button
                size="xs"
                variant="subtle"
                color="blue"
                onClick={() => clipboard.copy(currentSourceUrl)}
                leftSection={<span className={clsx(clipboard.copied ? "icon-[mdi--check] text-green-400" : "icon-[mdi--content-copy] text-blue-400")}></span>}
              >
                {clipboard.copied ? "已复制!" : "复制"}
              </Button>
            </Group>
            <Box
              bg="dark.9"
              p={6}
              style={{
                borderRadius: "var(--mantine-radius-sm)",
                fontFamily: "monospace",
                fontSize: "11px",
                wordBreak: "break-all",
                maxHeight: "60px",
                overflowY: "auto",
              }}
            >
              {currentSourceUrl}
            </Box>
          </Card>
        )}
        <Card
          bg="dark.7"
          p={0}
          radius="md"
          className="flex-1"
        >
          <MapView sourceUrl={currentSourceUrl} />
        </Card>
      </Box>

      <Box className="flex flex-col w-72">
        <ScrollArea style={{ height: "100%" }}>
          <Box className="flex flex-col gap-3 pr-2">
            {Object.entries(groupedSources).map(([title, items], index) => (
              <Card
                key={title}
                bg={index % 2 === 0 ? "dark.6" : "dark.5"}
                p="sm"
                radius="md"
              >
                <Title order={4} c="gray.1" mb="sm" size="h4">{title}</Title>
                <SourceList
                  sources={items}
                  onSourceSelect={handleSourceSelect}
                />
              </Card>
            ))}
          </Box>
        </ScrollArea>
      </Box>
    </Box>
  );
}

export default App;
