import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents, GeoJSON } from "react-leaflet";
import { trpc } from "../../utils/trpc";
import "leaflet/dist/leaflet.css";
import { Feature, GeoJsonObject } from "geojson";

interface Props {
  setZoomLevel: (arg0: any) => void;
  data: GeoJsonObject;
  selectedDGUID: string;
  setSelectedDGUID: (arg0: any) => void;
}

const geo_json_css = { color: "#FFBABA", weight: 1 };

const selected_geo_json_css = { color: "#D62618", weight: 1 };

const OverLays = ({
  setZoomLevel,
  data,
  setSelectedDGUID,
  selectedDGUID,
}: Props) => {
  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });
  const geoJsonRef = useRef<any>(null);

  const onEachFeature = (feature: Feature, layer: any) => {
    layer.on({
      click: handleClick,
    });

    // Set style if selectedDGUID is equal to feature.properties.dguid
    layer.setStyle(
      feature.properties?.dguid === selectedDGUID
        ? selected_geo_json_css
        : geo_json_css
    );
  };

  const handleClick = (event: any) => {
    if (!geoJsonRef.current) return;
    geoJsonRef.current.setStyle(geo_json_css);
    setSelectedDGUID(event.target.feature.properties?.dguid);
    event.target.setStyle(selected_geo_json_css);
  };

  return (
    <GeoJSON
      key={Math.random()}
      data={data}
      onEachFeature={onEachFeature}
      ref={geoJsonRef}
    />
  );
};

const Map = ({
  setSelectedDGUID,
  selectedDGUID,
  selectedGeographicUnit,
}: any) => {
  const [zoomLevel, setZoomLevel] = useState(3);
  const [shownData, setShownData] = useState("province");

  useEffect(() => {
    setShownData(selectedGeographicUnit);
    geoAreasQuery.refetch();
  }, [selectedGeographicUnit, shownData]);

  const geoAreasQuery = trpc.useQuery([
    "geoAreas.getAllGeoAreas",
    { geo_level: shownData },
  ]);

  const overlays = geoAreasQuery.data || {
    type: "FeatureCollection",
    features: [],
  };

  return (
    <div
      className="leaflet-container"
      style={{ height: "400px", width: "100%" }}
    >
      <MapContainer
        center={[58.632872646610736, -106.3468]}
        zoom={zoomLevel}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {!geoAreasQuery.isLoading && (
          <OverLays
            setZoomLevel={setZoomLevel}
            data={overlays}
            key={zoomLevel}
            setSelectedDGUID={setSelectedDGUID}
            selectedDGUID={selectedDGUID}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
