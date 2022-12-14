// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { ageDataRouter } from "./ageData";
import { geoNamesRouter } from "./geoNames";
import { geoAreasRouter } from "./geoAreas";
import { summaryRouter } from "./summary";
import { incomeDataRouter } from "./incomeData";
import { ranksRouter } from "./ranks";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("ageData.", ageDataRouter)
  .merge("geoNames.", geoNamesRouter)
  .merge("geoAreas.", geoAreasRouter)
  .merge("summary.", summaryRouter)
  .merge("incomeData.", incomeDataRouter)
  .merge("ranks.", ranksRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
