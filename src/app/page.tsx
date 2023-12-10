import { cn } from "@/lib/utils";
import { Noto_Serif_Ottoman_Siyaq } from "next/font/google";

import Content from "@/content";

import { Models } from "./fragments";
import { GridBackground } from "@/components/Display";
import { Navbar } from "@/components/Navigation";

const otman = Noto_Serif_Ottoman_Siyaq({
  subsets: ["latin"],
  weight: "400",
});

export default function Page() {
  return (
    <>
      <Navbar className="fixed top-0 z-20 w-full" />
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
                  <p className="text-bold text-xl">
                    {Content.Home.Hero.Subheading}
                  </p>
                </div>
                <div className="w-full">
                  <div className="inline-flex w-full justify-center">
                    <Models />
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
