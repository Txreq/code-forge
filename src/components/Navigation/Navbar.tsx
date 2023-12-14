import NextLink from "next/link";
import { Logo } from "@/components/Display";
import { Button } from "@/components/Form";

import type { Session } from "next-auth";

export default function Navbar(props: {
  className?: string;
  session: Session | null;
}) {
  return (
    <header className={props.className}>
      <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <span className="sr-only">Home</span>
            <Logo />
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <NextLink
              href={
                props.session && props.session.user ? "/chat" : "/auth/sign-in"
              }
            >
              <Button>
                {props.session && props.session.user ? "Chat" : "Sign in"}
              </Button>
            </NextLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
