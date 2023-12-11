
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

import { UserVerificationSchema } from "@/lib/schemas";

export const appRouter = createTRPCRouter({
  auth: createTRPCRouter({
    user: protectedProcedure.query(async ({ ctx }) => {
      try {
        const session = ctx.session
        return session?.user
      } catch {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "unauthorized access"
        })
      }
    }),
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;
