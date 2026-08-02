import type { FC } from "react";
import Map, { Layer, NavigationControl, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapViewProps {
  className?: string;
  sourceUrl?: string;
}

export const MapView: FC<MapViewProps> = ({ className, sourceUrl }) => {
  return (
    <div
      className={`flex-1 overflow-hidden p-2 ${className || ""}`}
      style={{
        backgroundColor: "var(--color-muted)",
      }}
    >
      <div
        className="w-full h-full overflow-hidden"
        style={{
          borderRadius: "var(--mantine-radius-sm)",
        }}
      >
        <Map
          initialViewState={{
            longitude: 121.4737,
            latitude: 31.2304,
            zoom: 10,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://demotiles.maplibre.org/style.json"
          mapLib={import("maplibre-gl")}
        >
          <NavigationControl
            position="top-right"
            style={{
              // Ensure navigation controls have visible focus states
              "--maplibregl-ctrl-icon-color": "var(--color-foreground)",
            } as React.CSSProperties}
          />
          {sourceUrl && (
            <Source
              id="base-tiles"
              type="raster"
              tiles={[sourceUrl]}
              tileSize={256}
            >
              <Layer
                id="base-tiles-layer"
                type="raster"
                source="base-tiles"
                paint={{}}
              />
            </Source>
          )}
        </Map>
      </div>
    </div>
  );
};
