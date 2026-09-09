import type { FC } from "react";

import Map, { Layer, NavigationControl, Source } from "react-map-gl/maplibre";
import { cn } from "../lib/utils";

import "maplibre-gl/dist/maplibre-gl.css";

interface MapViewProperties {
  className?: string;
  sourceUrl?: string;
}

export const MapView: FC<MapViewProperties> = ({ className, sourceUrl }) => {
  return (
    <div className={cn("flex-1 overflow-hidden p-2 bg-dark-500", className)}>
      <div className="w-full h-full overflow-hidden rounded-sm">
        <Map
          initialViewState={{
            latitude: 31.2304,
            longitude: 121.4737,
            zoom: 8,
          }}
          mapLib={import("maplibre-gl")}
          mapStyle="https://demotiles.maplibre.org/style.json"
          style={{ height: "100%", width: "100%" }}
        >
          <NavigationControl position="top-right" />
          {sourceUrl && (
            <Source
              id="base-tiles"
              tiles={[sourceUrl]}
              tileSize={256}
              type="raster"
            >
              <Layer
                id="base-tiles-layer"
                paint={{}}
                source="base-tiles"
                type="raster"
              />
            </Source>
          )}
        </Map>
      </div>
    </div>
  );
};
