import { useState, useEffect, MouseEvent } from "react";
import { MapContainer, TileLayer, useMapEvents, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import provinces from "./provinces.json";
import censusDivision from "./censusDivisions.json";
import { TypeOf } from "zod";
import { GeoJsonObject } from "geojson";

const GeoJSONData: GeoJSON.Feature = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [125.6, 10.1],
  },
  properties: {},
};

interface Props {
  setZoomLevel: Function;
  // setData: Function;
  data: typeof GeoJSONData;
  setSelectedGeo: Function;
}

const OverLays = ({ setZoomLevel, data, setSelectedGeo }: Props) => {
  const mapEvents = useMapEvents({
    zoomstart: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });
  // TO DO: Change feature and layer away from any to GeoJSON.Feature

  const onEachFeature = (feature: typeof GeoJSONData, layer: any) => {
    layer.on({
      mouseover: onMouseOver,
      mouseout: resetHighlight,
      click: handleClick,
    });
  };
  const handleClick = (event: any) => {
    setSelectedGeo(event.target.feature.properties.geo_name);
  };

  const onMouseOver = (event: any) => {
    event.target.setStyle({
      color: "white",
    });
  };

  const resetHighlight = (event: any) => {
    event.target.setStyle({
      color: "red",
    });
  };

  return (
    <GeoJSON
      data={data}
      style={{ color: "red" }}
      onEachFeature={onEachFeature}
    />
  );
};

const Map = ({ setSelectedGeo }: any) => {
  const [zoomLevel, setZoomLevel] = useState(3); // initial zoom level provided for MapContainer
  const [data, setData] = useState<any>(provinces); //

  useEffect(() => {
    const handleData = () => {
      console.log("zoomLevel", zoomLevel);
      if (zoomLevel <= 2) {
        setData(provinces);
      } else {
        setData(censusDivision);
      }
    };
    setData(provinces);
    handleData();
  }, [zoomLevel]);

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
          data={data.features}
          key={zoomLevel}
          setSelectedGeo={setSelectedGeo}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
