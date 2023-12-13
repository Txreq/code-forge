import NextLink from "next/link";
import { Logo } from "@/components/Display";
import { Button } from "@/components/Form";

export default function Navbar(props: { className?: string }) {
  return (
    <header className={props.className}>
      <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <span className="sr-only">Home</span>
            <Logo />
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <NextLink href="/auth/sign-in">
              <Button>Login</Button>
            </NextLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
