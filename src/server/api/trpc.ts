import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

import superjson from "superjson";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { Resend } from "resend";
import { env } from "@/env";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getServerAuthSession();
  const resend = new Resend(env.RESEND_API_KEY)

  return {
    db,
    session: {
      ...session,
      user: (!session || !session.user) ? null : (await db.user.findUnique({
        where: {
          id: session.user.id
        }
      }))
    },
    resend,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});


export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
