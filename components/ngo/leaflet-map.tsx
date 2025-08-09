"use client"

import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, LayersControl, LayerGroup } from "react-leaflet"

const maptilerKey = "7QM1kFuQqp5kD5Blg8oX"
// NDVI layer remains optional; without tiles access it won't render, so we use a semi-transparent hybrid layer as placeholder.
export default function LeafletMap() {
  return (
    <div className="rounded-xl overflow-hidden border bg-card">
      <MapContainer center={[9.01, 38.76]} zoom={6} style={{ height: 420, width: "100%" }}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Satellite">
            <TileLayer
              url={`https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${maptilerKey}`}
              tileSize={512}
              zoomOffset={-1}
              attribution="&copy; MapTiler &copy; OpenStreetMap"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="NDVI (demo)">
            <LayerGroup>
              <TileLayer
                url={`https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${maptilerKey}`}
                opacity={0.35}
                tileSize={512}
                zoomOffset={-1}
              />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  )
}
