import { createRouter } from "./context";
import { z } from "zod";

function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export const geoNamesRouter = createRouter().query("getGeoNameByDGUID", {
  input: z.object({
    dguid: z.string(),
  }),
  async resolve({ ctx, input }) {
    const geo_name = await ctx.prisma.geo_names.findFirst({
      where: { dguid: input.dguid },
    });
    return geo_name?.geo_name;
  },
});
