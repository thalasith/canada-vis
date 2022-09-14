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
