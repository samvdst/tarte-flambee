import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "~/server/api/trpc";

export const registrationRouter = createTRPCRouter({
  getActiveTartFlambe: protectedProcedure.query(async ({ ctx }) => {
    const tournament = await ctx.db.tournament.findFirst({
      where: {
        registrierungAktiv: true,
      },
    });

    return tournament;
  }),

  getMyRegistration: protectedProcedure.query(async ({ ctx }) => {
    const myRegistration = await ctx.db.registration.findFirst({
      where: {
        userId: ctx.session.user.id,
        Tournament: {
          registrierungAktiv: true,
        },
      },
      select: {
        id: true,
        User: true,
        Tournament: true,
        ingameUsername: true,
        rank: true,
      },
    });

    return myRegistration;
  }),

  register: protectedProcedure
    .input(
      z.object({
        ingameUsername: z.string(),
        rank: z.enum([
          "iron",
          "bronze",
          "silber",
          "gold",
          "platin",
          "diamond",
          "master",
          "grandmaster",
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (
        [
          "iron",
          "bronze",
          "silber",
          "gold",
          "platin",
          "diamond",
          "master",
          "grandmaster",
        ].includes(input.rank) === false
      ) {
        throw new Error("Rank ist nicht gültig");
      }

      const currentTartFlambe = await ctx.db.tournament.findFirst({
        where: {
          registrierungAktiv: true,
        },
      });

      if (!currentTartFlambe) {
        throw new Error("Es gibt keine aktive TartFlambe");
      }

      await ctx.db.registration.create({
        data: {
          userId: ctx.session.user.id,
          ingameUsername: input.ingameUsername,
          tartFlambeId: currentTartFlambe.id,
          rank: input.rank,
        },
      });
    }),
});
