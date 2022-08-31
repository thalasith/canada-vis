import { useState, useEffect, MouseEvent } from "react";
import { MapContainer, TileLayer, useMapEvents, GeoJSON } from "react-leaflet";
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
    zoomstart: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });
  // TO DO: Change layer away from any to GeoJSON.Feature

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
  const { data: provinces } = trpc.useQuery([
    "geoAreas.getAllProvinces",
    { geo_level: "provinces" },
  ]);
  // const [data, setData] = useState<any>(provinces); //

  // useEffect(() => {
  //   const handleData = () => {
  //     if (zoomLevel <= 2) {
  //       setData(provinces);
  //     } else {
  //       setData(censusDivision);
  //     }
  //   };
  //   setData(provinces);
  //   handleData();
  // }, [zoomLevel]);
  const overlays = provinces || { type: "FeatureCollection", features: [] };

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
        <OverLays
          setZoomLevel={setZoomLevel}
          data={overlays}
          key={zoomLevel}
          setSelectedDGUID={setSelectedDGUID}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
