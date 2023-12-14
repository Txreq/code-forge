import { cn } from "@/lib/utils";
import { Noto_Serif_Ottoman_Siyaq } from "next/font/google";

import Content from "@/content";

import { Glass, GlassCard, GlassContent } from "@/components/Display";
import Image from "next/image";
import Style from "@/styles/modules/models.module.scss";

import { GridBackground } from "@/components/Display";
import { Link, Navbar } from "@/components/Navigation";
import { Button } from "@/components/Form";
import { getServerAuthSession } from "@/server/auth";

const otman = Noto_Serif_Ottoman_Siyaq({
  subsets: ["latin"],
  weight: "400",
});

export default async function Page() {
  const session = await getServerAuthSession();
  return (
    <>
      <Navbar session={session} className="fixed top-0 z-20 w-full" />
      <main>
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute top-0 h-full w-full">
            <GridBackground
              className="absolute left-0 top-0 z-[1]"
              cellSize={20}
              width={1920}
              height={1080}
              stroke={0.5}
            />
            <div className="radial-overlay absolute top-0 z-[2] h-full w-full"></div>
          </div>
          <div className="absolute z-10 h-full w-full">
            <div className="mx-auto h-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-full w-full flex-row items-center">
                <div className="w-full">
                  <h1
                    className={cn(
                      "text-xl capitalize text-primary md:text-7xl",
                      otman.className,
                    )}
                  >
                    {Content.Home.Hero.Headline}
                  </h1>
                  <div className="flex flex-col gap-y-2">
                    <p className="text-bold text-xl">
                      {Content.Home.Hero.Subheading}
                    </p>
                    <Link
                      href={
                        !session || !session?.user ? "/auth/sign-in" : "/chat"
                      }
                    >
                      <Button>Start now</Button>
                    </Link>
                  </div>
                </div>
                <div className="w-full">
                  <div className="inline-flex w-full justify-center">
                    <Glass className={Style.grid}>
                      {Content.Home.Features.map(({ src, alt, title }, i) => (
                        <GlassCard
                          key={i}
                          className={cn(
                            "group relative col-span-1 row-span-2 row-start-2",
                            `row-start-${i + 1} row-end-${i + 2}`,
                          )}
                        >
                          <GlassContent className="bg-black/[.4] backdrop-blur-sm">
                            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:-translate-y-3/4 md:h-20 md:w-20">
                              <Image src={src} alt={alt} fill />
                            </div>
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold capitalize opacity-0 transition-all duration-500 group-hover:translate-y-3/4 group-hover:opacity-100">
                              {title}
                            </span>
                          </GlassContent>
                        </GlassCard>
                      ))}
                    </Glass>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
