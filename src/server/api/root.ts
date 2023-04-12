import { z } from "zod";
import { authRouter } from "~/server/api/routers/auth";
import { profileRouter } from "~/server/api/routers/profile";
import { createTRPCRouter, mergeRouters, protectedProcedure } from "~/server/api/trpc";

const loggedInViewerRouter = createTRPCRouter({
  me: protectedProcedure
    .input(
      z
        .object({
          select: z
            .object({
              highestEducationalExperience: z.boolean(),
              interestedTopics: z.boolean(),
            })
            .optional(),
        })
        .optional()
    )
    .query(({ input, ctx }) => {
      const { select } = input ?? {};
      const { highestEducationalExperience, interestedTopics, ...user } = ctx.user;

      return {
        ...user,
        ...(select?.highestEducationalExperience && {
          highestEducationalExperience,
        }),
        ...(select?.interestedTopics && { interestedTopics }),
      };
    }),
});

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = mergeRouters(
  loggedInViewerRouter,
  createTRPCRouter({
    loggedInViewerRouter,
    auth: authRouter,
    profile: profileRouter,
  })
);

// export type definition of API
export type AppRouter = typeof appRouter;
