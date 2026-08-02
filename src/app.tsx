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
    <Box
      className="w-screen h-screen p-3 pr-1 flex flex-row justify-start items-stretch gap-3"
      style={{
        backgroundColor: "var(--color-background)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <Box className="flex-1 flex flex-col gap-3">
        {currentSourceUrl && (
          <Card
            p="sm"
            radius="md"
            style={{
              backgroundColor: "var(--color-muted)",
              border: "1px solid var(--color-border)",
            }}
          >
            <Group justify="space-between" mb={4}>
              <Text
                size="xs"
                fw={500}
                style={{ color: "var(--color-foreground)" }}
              >
                当前底图URL:
              </Text>
              <Button
                size="xs"
                variant="subtle"
                onClick={() => clipboard.copy(currentSourceUrl)}
                leftSection={(
                  <span
                    className={clsx(
                      clipboard.copied
                        ? "icon-[mdi--check]"
                        : "icon-[mdi--content-copy]",
                    )}
                    style={{
                      color: clipboard.copied
                        ? "var(--color-accent)"
                        : "var(--color-foreground)",
                    }}
                  />
                )}
                style={{
                  color: clipboard.copied
                    ? "var(--color-accent)"
                    : "var(--color-foreground)",
                }}
              >
                {clipboard.copied ? "已复制!" : "复制"}
              </Button>
            </Group>
            <Box
              p={6}
              style={{
                borderRadius: "var(--mantine-radius-sm)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                wordBreak: "break-all",
                maxHeight: "60px",
                overflowY: "auto",
                backgroundColor: "var(--color-primary)",
                color: "var(--color-foreground)",
              }}
            >
              {currentSourceUrl}
            </Box>
          </Card>
        )}
        <Card
          p={0}
          radius="md"
          className="flex-1"
          style={{
            backgroundColor: "var(--color-secondary)",
            border: "1px solid var(--color-border)",
            overflow: "hidden",
          }}
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
                p="sm"
                radius="md"
                style={{
                  backgroundColor: index % 2 === 0
                    ? "var(--color-muted)"
                    : "var(--color-secondary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Title
                  order={4}
                  size="h4"
                  mb="sm"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {title}
                </Title>
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
