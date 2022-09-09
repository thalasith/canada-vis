import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { trpc } from "../../utils/trpc";
import { Feature, GeoJsonObject } from "geojson";

interface Props {
  setZoomLevel: (arg0: any) => void;
  data: GeoJsonObject;
  // Feature[];
  setSelectedDGUID: (arg0: any) => void;
}

const geo_json_css = { color: "#D62618", weight: 1 };

const OverLays = ({ setZoomLevel, data, setSelectedDGUID }: Props) => {
  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });

  const map = useMap();
  console.log(useMap().getCenter());

  const onEachFeature = (feature: Feature, layer: any) => {
    layer.on({
      mouseover: onMouseOver,
      mouseout: resetHighlight,
      click: handleClick,
    });
  };
  const handleClick = (event: any) => {
    setSelectedDGUID(event.target.feature.properties.dguid);
  };

  const onMouseOver = (event: any) => {
    event.target.setStyle({
      color: "white",
    });
  };

  const resetHighlight = (event: any) => {
    event.target.setStyle(geo_json_css);
  };

  return (
    <GeoJSON data={data} style={geo_json_css} onEachFeature={onEachFeature} />
  );
};

const Map = ({ setSelectedDGUID }: any) => {
  const [zoomLevel, setZoomLevel] = useState(3); // initial zoom level provided for MapContainer
  const [shownData, setShownData] = useState("province");
  useEffect(() => {
    if (zoomLevel <= 3) {
      setShownData("province");
      geoAreasQuery.refetch();
    } else {
      setShownData("census division");
      geoAreasQuery.refetch();
    }
  }, [zoomLevel]);

  const geoAreasQuery = trpc.useQuery([
    "geoAreas.getAllGeoAreas",
    { geo_level: shownData },
  ]);

  const overlays = geoAreasQuery.data || {
    type: "FeatureCollection",
    features: [],
  };

  return (
    <div className="leaflet-container">
      <MapContainer
        center={[56.1304, -106.3468]}
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
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
