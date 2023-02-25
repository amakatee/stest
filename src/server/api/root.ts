import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { usersRouter } from "./routers/users";
import { packagesRouter } from "./routers/packages";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  users: usersRouter,
  packages: packagesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
