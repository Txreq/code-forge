import "server-only";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

import type { Session } from "next-auth";
import { headers } from "next/headers";

export const withAuth = <T,>(Component: React.ComponentType<T & Session>) => {
  const WrapperComponent = async (props: T) => {
    const session = await getServerAuthSession();
    if (!session || !session?.user) redirect("/auth/sign-in");
    else {
      const user = await db.user.findUnique({ where: { id: session.user.id } });
      const url = headers().get("x-url");

      if (!user?.verified && !url?.startsWith("/auth/verify")) {
        redirect("/auth/verify");
      } else return <Component {...props} {...session} />;
    }
  };

  return WrapperComponent;
};