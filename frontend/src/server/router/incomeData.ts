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

    Object.keys(data).forEach((key) => {
      const list: string[] = key.split("_");
      list.shift();

      //   console.log(list);
      const age = list.join(" ");
      const entry = { name: age, male: 0, female: 0 };
      if (entry.name !== "") {
        // console.log("yep");
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
