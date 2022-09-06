import { createRouter } from "./context";
import { z } from "zod";
import {
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Feature,
} from "geojson";

function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export const geoAreasRouter = createRouter()
  .query("getAllGeoAreas", {
    input: z.object({
      geo_level: z.string(),
    }),
    async resolve({ ctx, input }) {
      const provinces = await ctx.prisma.geo_areas.findMany({
        where: { geo_level: input.geo_level },
      });
      // console.log(provinces);
      const features: Feature[] = [];
      provinces.forEach((province) => {
        const json_coords = province.coordinates as string;
        const geometry: Geometry = JSON.parse(json_coords);
        const properties: GeoJsonProperties = {
          name: province.geo_name,
          geo_name: province.geo_name,
          dguid: province.dguid,
          land_area: province.land_area,
        };
        const feature: Feature = {
          type: "Feature",
          geometry: {
            type: "MultiPolygon",
            coordinates: JSON.parse(json_coords),
          },
          properties,
        };

        features.push(feature);
      });
      const results: FeatureCollection = {
        type: "FeatureCollection",
        features,
      };

      return results;
    },
  })
  .query("getInitData", {
    async resolve({ ctx }) {
      const provinces = await ctx.prisma.geo_areas.findMany({
        where: { geo_level: "province" },
      });
      // console.log(provinces);
      const features: Feature[] = [];
      provinces.forEach((province) => {
        const json_coords = province.coordinates as string;
        const geometry: Geometry = JSON.parse(json_coords);
        const properties: GeoJsonProperties = {
          name: province.geo_name,
          geo_name: province.geo_name,
          dguid: province.dguid,
          land_area: province.land_area,
        };
        const feature: Feature = {
          type: "Feature",
          geometry: {
            type: "MultiPolygon",
            coordinates: JSON.parse(json_coords),
          },
          properties,
        };

        features.push(feature);
      });
      const results: FeatureCollection = {
        type: "FeatureCollection",
        features,
      };

      return results;
    },
  });
