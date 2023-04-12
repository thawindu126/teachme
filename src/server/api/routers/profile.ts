import {
  HighestEducationalExperience,
  UserStatus,
  type HighestEducationalExperience as HighestEducationalExperienceType,
} from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  finishOnboarding: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        highestEducationalExperience: z.enum(
          Object.values(HighestEducationalExperience) as [
            HighestEducationalExperienceType,
            ...HighestEducationalExperienceType[]
          ]
        ),
        interestedTopics: z.string().array(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { user, prisma } = ctx;
      await prisma.user.update({
        where: { id: user.id },
        data: { ...input, status: UserStatus.ACTIVE },
      });
    }),
});
