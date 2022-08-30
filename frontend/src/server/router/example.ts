import { createRouter } from "./context";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// interface DataType {
//   male_0_to_4_years: number,
//   male_5_to_9_years: number,
//   male_10_to_14_years: number,
//   male_15_to_19_years: number,
//   male_20_to_24_years: number,
//   male_25_to_29_years: number,
//   male_30_to_34_years: number,
//   male_35_to_39_years: number,
//   male_40_to_44_years: number,
//   male_45_to_49_years: number,
//   male_50_to_54_years: number,
//   male_55_to_59_years: number,
//   male_60_to_64_years: number,
//   male_65_to_69_years: number,
//   male_70_to_74_years: number,
//   male_75_to_79_years: number,
//   male_80_to_84_years: number,
//   male_85_to_89_years: number,
//   male_90_to_94_years: number,
//   male_95_to_99_years: number,
//   male_100_years_and_over: number,
//   female_0_to_4_years: number,
//   female_5_to_9_years: number,
//   female_10_to_14_years: number,
//   female_15_to_19_years: number,
//   female_20_to_24_years: number,
//   female_25_to_29_years: number,
//   female_30_to_34_years: number,
//   female_35_to_39_years: number,
//   female_40_to_44_years: number,
//   female_45_to_49_years: number,
//   female_50_to_54_years: number,
//   female_55_to_59_years: number,
//   female_60_to_64_years: number,
//   female_65_to_69_years: number,
//   female_70_to_74_years: number,
//   female_75_to_79_years: number,
//   female_80_to_84_years: number,
//   female_85_to_89_years: number,
//   female_90_to_94_years: number,
//   female_95_to_99_years: number,
//   female_100_years_and_over: number,

// }

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAgeData", {
    input: z.object({
      geo_name: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.age_groups.findFirst({
        where: {
          geo_name: input.geo_name,
        },
        select: {
          male_0_to_4_years: true,
          male_5_to_9_years: true,
          male_10_to_14_years: true,
          male_15_to_19_years: true,
          male_20_to_24_years: true,
          male_25_to_29_years: true,
          male_30_to_34_years: true,
          male_35_to_39_years: true,
          male_40_to_44_years: true,
          male_45_to_49_years: true,
          male_50_to_54_years: true,
          male_55_to_59_years: true,
          male_60_to_64_years: true,
          male_65_to_69_years: true,
          male_70_to_74_years: true,
          male_75_to_79_years: true,
          male_80_to_84_years: true,
          male_85_to_89_years: true,
          male_90_to_94_years: true,
          male_95_to_99_years: true,
          male_100_years_and_over: true,
          female_0_to_4_years: true,
          female_5_to_9_years: true,
          female_10_to_14_years: true,
          female_15_to_19_years: true,
          female_20_to_24_years: true,
          female_25_to_29_years: true,
          female_30_to_34_years: true,
          female_35_to_39_years: true,
          female_40_to_44_years: true,
          female_45_to_49_years: true,
          female_50_to_54_years: true,
          female_55_to_59_years: true,
          female_60_to_64_years: true,
          female_65_to_69_years: true,
          female_70_to_74_years: true,
          female_75_to_79_years: true,
          female_80_to_84_years: true,
          female_85_to_89_years: true,
          female_90_to_94_years: true,
          female_95_to_99_years: true,
          female_100_years_and_over: true,
        },
      });
    },
  });
