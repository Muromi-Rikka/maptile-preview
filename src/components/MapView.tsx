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
        backgroundColor: "var(--color-ocean)",
        position: "relative",
      }}
    >
      {/* Subtle coordinate grid overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(var(--grid-line-color) var(--grid-line-width), transparent var(--grid-line-width)),
            linear-gradient(90deg, var(--grid-line-color) var(--grid-line-width), transparent var(--grid-line-width))
          `,
          backgroundSize: "50px 50px",
          opacity: 0.3,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        className="w-full h-full overflow-hidden"
        style={{
          borderRadius: "var(--mantine-radius-sm)",
          position: "relative",
          zIndex: 2,
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
              "--maplibregl-ctrl-icon-color": "var(--color-annotation)",
              "--maplibregl-ctrl-bg": "var(--color-land)",
              "--maplibregl-ctrl-border": "var(--color-grid)",
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
