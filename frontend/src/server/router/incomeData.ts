import { createRouter } from "./context";
import { z } from "zod";

function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export const incomeDataRouter = createRouter().query("getIncomeDataByDGUID", {
  input: z.object({
    dguid: z.string(),
  }),
  async resolve({ ctx, input }) {
    const data: any = await ctx.prisma.income_groups.findFirst({
      where: {
        dguid: input.dguid,
      },
    });
    const new_data: any[] = [];
    let total = 0;

    Object.entries(data).forEach(([key, value]: any) => {
      const list: string[] = key.split("_");
      list.shift();

      const income_group = list.join(" ");
      const entry = { name: income_group, male: 0, female: 0 };
      if (entry.name !== "") {
        new_data.push(entry);
      }
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

    Object.entries(data).forEach(([key, value]: any) => {
      const list: string[] = key.split("_");
      const gender = list[0];
      list.shift();
      const income_group = list.join(" ");
      const entry = results.find((obj: any) => obj.name === income_group);
      if (gender === "male") {
        entry.male = 100 * (value / total);
      } else if (gender === "female") {
        entry.female = 100 * (value / total);
      }
    });

    const index = [12, 11, 0, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2];
    const output = index.map((i) => results[i]);

    return output;
  },
});
