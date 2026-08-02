import type { SourceItemData } from "./types/source";
import { useQuery } from "@tanstack/react-query";
import { Check, Copy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { MapView } from "./components/MapView";
import { SourceList } from "./components/SourceList";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { ScrollArea } from "./components/ui/scroll-area";
import { useClipboard } from "./hooks/use-clipboard";
import { cn } from "./lib/utils";

function App() {
  const { data: sources } = useQuery<SourceItemData[]>({
    queryKey: ["sources"],
    queryFn: () => fetch("/sources.json").then(res => res.json()),
  });
  const [currentSourceUrl, setCurrentSourceUrl] = useState<string>("");
  const [selectedSourceName, setSelectedSourceName] = useState<string>("");
  const clipboard = useClipboard();

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

  useEffect(() => {
    if (sources && sources.length > 0 && !currentSourceUrl) {
      const gcj02Source = sources.find(s => s.title === "GCJ02");
      const defaultSource = gcj02Source || sources[0];
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setCurrentSourceUrl(defaultSource.urlTemplate);
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setSelectedSourceName(defaultSource.name);
    }
  }, [currentSourceUrl, sources]);

  const handleSourceSelect = (source: SourceItemData) => {
    setCurrentSourceUrl(source.urlTemplate);
    setSelectedSourceName(source.name);
  };

  return (
    <div className="w-screen h-screen bg-background p-3 pr-1 flex flex-row justify-start items-stretch gap-3">
      <div className="flex-1 flex flex-col gap-3">
        {currentSourceUrl && (
          <Card>
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary">当前底图URL:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clipboard.copy(currentSourceUrl)}
                  className="h-6 px-2 text-xs"
                >
                  {clipboard.copied
                    ? <Check className="h-3 w-3 text-green-400 animate-copy-bounce" />
                    : <Copy className="h-3 w-3 text-primary" />}
                  {clipboard.copied ? "已复制!" : "复制"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="bg-muted rounded-md p-1.5 font-mono text-[11px] break-all max-h-[60px] overflow-y-auto text-primary">
                {currentSourceUrl}
              </div>
            </CardContent>
          </Card>
        )}
        <Card className="flex-1 p-0">
          <MapView sourceUrl={currentSourceUrl} />
        </Card>
      </div>

      <div className="flex flex-col w-72">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-3 pr-2">
            {Object.entries(groupedSources).map(([title, items], index) => (
              <Card key={title} className={cn(index % 2 === 0 ? "bg-muted/50" : "bg-muted/30")}>
                <CardHeader className="p-3 pb-2">
                  <CardTitle className="text-sm">{title}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <SourceList
                    sources={items}
                    selectedName={selectedSourceName}
                    onSourceSelect={handleSourceSelect}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default App;
