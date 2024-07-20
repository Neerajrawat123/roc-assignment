import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
 

  modifyInterest: publicProcedure
    .input(z.object({ id: z.number(), isChecked: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { id, isChecked } = input;
      return ctx.db.thing.update({
        where: {
          id: id,
        },
        data: {
          isChecked: isChecked,
        },
      });
    }),

  getLatest: publicProcedure
    .input(z.object({ from: z.number(), items: z.number() }))
    .query(async ({ ctx, input }) => {
      const { from, items } = input;
      return ctx.db.thing.findMany({
        skip: from,
        take: items,
      });
    }),
});
