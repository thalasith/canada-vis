import { createRouter } from "./context";
import { z } from "zod";

function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export const summaryRouter = createRouter().query("getSummaryByDGUID", {
  input: z.object({
    dguid: z.string(),
  }),
  async resolve({ ctx, input }) {
    const summary = await ctx.prisma.summary.findFirst({
      where: { dguid: input.dguid },
    });
    return summary;
  },
});
// .query("getIncomeRanks", {
//   async resolve({ ctx }) {
//     return await ctx.prisma
//       .$queryRaw`SELECT summary.dguid, summary.total_median_employment_income_in_2020_among_recipients, geo_areas.pruid, RANK () OVER (ORDER BY total_median_employment_income_in_2020_among_recipients DESC) FROM summary INNER JOIN geo_areas ON summary.dguid = geo_areas.dguid AND geo_areas.geo_level = 'province';`;
//   },
// });
