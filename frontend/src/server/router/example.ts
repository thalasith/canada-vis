import { createRouter } from "./context";
import { z } from "zod";

function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export const exampleRouter = createRouter()
  .query("getGeoName", {
    input: z.object({
      dguid: z.string(),
    }),
    async resolve({ ctx, input }) {
      const geo_name = await ctx.prisma.geo_names.findFirst({
        where: { dguid: input.dguid },
      });
      return geo_name?.geo_name;
    },
  })
  .query("getAgeData", {
    input: z.object({
      dguid: z.string(),
    }),
    async resolve({ ctx, input }) {
      const data: any = await ctx.prisma.age_groups.findFirst({
        where: {
          dguid: input.dguid,
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
      const new_data: any[] = [];

      Object.keys(data).forEach((key) => {
        const list: string[] = key.split("_");
        list.shift();
        const age = list.join(" ");
        const entry = { name: age, male: 0, female: 0 };

        new_data.push(entry);
      });

      const results = new_data.reduce((unique, o) => {
        if (
          !unique.some(
            (obj: any) =>
              obj.name === o.name &&
              obj.male === o.male &&
              obj.female === o.female
          )
        ) {
          unique.push(o);
        }
        return unique;
      }, []);

      Object.entries(data).forEach(([key, value]) => {
        const list: string[] = key.split("_");
        const gender = list[0];
        list.shift();
        const age = list.join(" ");
        const entry = results.find((obj: any) => obj.name === age);
        if (gender === "male") {
          entry.male = value;
        } else if (gender === "female") {
          entry.female = value;
        }
      });

      return results;
    },
  });
