"use client";

import { Glass } from "@/components/Display";
import Image from "next/image";
import Style from "../styles/models.module.scss";
import Content from "@/content";

export default function Models(props: { className?: string }) {
  return (
    <Glass.Provider className={`${Style.grid} ${props.className}`}>
      {Content.Home.Features.map(({ src, alt, title }, i) => (
        <Glass.Card
          key={i}
          className={`group relative col-span-1 row-span-2 col-start-${
            ((i + 1) % 2) + 1
          } col-end-${((i + 1) % 2) + 1} row-span-2 row-start-${i + 1}`}
        >
          <Glass.Content className="bg-black/[.4] backdrop-blur-sm">
            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:-translate-y-3/4 md:h-20 md:w-20">
              <Image src={src} alt={alt} fill />
            </div>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold capitalize opacity-0 transition-all duration-500 group-hover:translate-y-3/4 group-hover:opacity-100">
              {title}
            </span>
          </Glass.Content>
        </Glass.Card>
      ))}
    </Glass.Provider>
  );
}
