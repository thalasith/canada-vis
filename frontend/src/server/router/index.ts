// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { ageDataRouter } from "./ageData";
import { geoNamesRouter } from "./geoNames";
import { geoAreasRouter } from "./geoAreas";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("ageData.", ageDataRouter)
  .merge("geoNames.", geoNamesRouter)
  .merge("geoAreas.", geoAreasRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
