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
        backgroundColor: "var(--color-ocean)",
        fontFamily: "var(--font-body)",
      }}
    >
      <Box className="flex-1 flex flex-col gap-3">
        {/* Coordinate Header Bar */}
        <Card
          p="xs"
          radius="sm"
          style={{
            backgroundColor: "var(--color-land)",
            border: "1px solid var(--color-grid)",
          }}
        >
          <Group justify="space-between">
            <Group gap="xs">
              <Text
                size="xs"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-coordinate)",
                  letterSpacing: "0.05em",
                }}
              >
                坐标系
              </Text>
              <Box
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-coordinate)",
                  animation: "marker-pulse 2s ease-in-out infinite",
                }}
              />
            </Group>
            <Text
              size="xs"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-meridian)",
              }}
            >
              121.4737°E, 31.2304°N
            </Text>
          </Group>
        </Card>

        {/* Source URL Display */}
        {currentSourceUrl && (
          <Card
            p="xs"
            radius="sm"
            style={{
              backgroundColor: "var(--color-land)",
              border: "1px solid var(--color-contour)",
              borderTop: "2px solid var(--color-coordinate)",
            }}
          >
            <Group justify="space-between" mb={4}>
              <Text
                size="xs"
                fw={500}
                style={{ color: "var(--color-annotation)" }}
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
                        ? "var(--color-coordinate)"
                        : "var(--color-annotation)",
                    }}
                  />
                )}
                style={{
                  color: clipboard.copied
                    ? "var(--color-coordinate)"
                    : "var(--color-annotation)",
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
                backgroundColor: "var(--color-ocean)",
                color: "var(--color-annotation)",
                border: "1px dashed var(--color-grid)",
              }}
            >
              {currentSourceUrl}
            </Box>
          </Card>
        )}

        {/* Map Container with Coordinate Grid */}
        <Card
          p={0}
          radius="sm"
          className="flex-1"
          style={{
            backgroundColor: "var(--color-land)",
            border: "1px solid var(--color-grid)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Coordinate markers on edges */}
          <Box
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              fontFamily: "var(--font-display)",
              fontSize: "10px",
              color: "var(--color-coordinate)",
              zIndex: 10,
              backgroundColor: "rgba(10, 22, 40, 0.8)",
              padding: "2px 6px",
              borderRadius: "2px",
            }}
          >
            121.5°E
          </Box>
          <Box
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              fontFamily: "var(--font-display)",
              fontSize: "10px",
              color: "var(--color-coordinate)",
              zIndex: 10,
              backgroundColor: "rgba(10, 22, 40, 0.8)",
              padding: "2px 6px",
              borderRadius: "2px",
            }}
          >
            31.2°N
          </Box>
          <MapView sourceUrl={currentSourceUrl} />
        </Card>
      </Box>

      {/* Source List Panel */}
      <Box className="flex flex-col w-72">
        <ScrollArea style={{ height: "100%" }}>
          <Box className="flex flex-col gap-3 pr-2">
            {Object.entries(groupedSources).map(([title, items], index) => (
              <Card
                key={title}
                p="sm"
                radius="sm"
                style={{
                  backgroundColor: "var(--color-land)",
                  border: "1px solid var(--color-grid)",
                  borderLeft: index === 0
                    ? "3px solid var(--color-coordinate)"
                    : index === 1
                      ? "3px solid var(--color-meridian)"
                      : "3px solid var(--color-contour)",
                }}
              >
                <Title
                  order={4}
                  size="h4"
                  mb="sm"
                  style={{
                    color: "var(--color-annotation)",
                    fontFamily: "var(--font-display)",
                    fontSize: "14px",
                    letterSpacing: "0.02em",
                  }}
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
