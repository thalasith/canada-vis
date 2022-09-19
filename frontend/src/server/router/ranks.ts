import { createRouter } from "./context";
import { z } from "zod";

export const ranksRouter = createRouter().query("getDGUIDRank", {
  input: z.object({
    dguid: z.string(),
  }),
  async resolve({ ctx, input }) {
    const rank = await ctx.prisma.ranks.findFirst({
      where: { dguid: input.dguid },
    });
    return rank;
  },
});
