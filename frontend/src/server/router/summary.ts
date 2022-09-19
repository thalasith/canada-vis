import { createRouter } from "./context";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { AnyARecord } from "dns";

function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export const summaryRouter = createRouter()
  .query("getSummaryByDGUID", {
    input: z.object({
      dguid: z.string(),
    }),
    async resolve({ ctx, input }) {
      const summary = await ctx.prisma.summary.findFirst({
        where: { dguid: input.dguid },
      });
      return summary;
    },
  })
  .query("getIncomeRankByDGUID", {
    input: z.object({
      dguid: z.string(),
    }),
    async resolve({ ctx, input }) {
      const geo_name = await ctx.prisma.geo_names.findFirst({
        where: { dguid: input.dguid },
      });
      const incomeRanks: any = await ctx.prisma.$queryRaw(
        Prisma.sql`SELECT summary.dguid, geo_names.parent_dguid, RANK () OVER (ORDER BY total_population_2021 DESC) AS pop_rank, RANK () OVER (ORDER BY total_population_percentage_change_2016_to_2021 DESC) AS pop_growth_rank, RANK () OVER (ORDER BY total_population_density_per_square_kilometre DESC) AS pop_density_rank, RANK () OVER (ORDER BY total_average_household_size DESC) AS household_size_rank, RANK () OVER (ORDER BY total_median_age_of_the_population DESC) AS age_rank, RANK () OVER (ORDER BY total_median_employment_income_in_2020_among_recipients DESC) AS income_rank FROM summary INNER JOIN geo_names ON summary.dguid = geo_names.dguid AND geo_names.geo_level = ${geo_name?.geo_level} AND geo_names.parent_dguid=${geo_name?.parent_dguid};`
      );
      const dguid_rank = incomeRanks.filter(
        (obj: any) => obj.dguid === geo_name?.dguid
      );
      dguid_rank[0]["total"] = incomeRanks.length;
      const output = dguid_rank[0];
      output["pop_rank"] = parseInt(output.pop_rank);
      output["pop_growth_rank"] = parseInt(output.pop_growth_rank);
      output["pop_density_rank"] = parseInt(output.pop_density_rank);
      output["household_size_rank"] = parseInt(output.household_size_rank);
      output["age_rank"] = parseInt(output.age_rank);
      output["income_rank"] = parseInt(output.income_rank);

      return output;
    },
  });
