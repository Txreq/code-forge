import Content from "@/content";
import { cn } from "@/lib/utils";
import { Noto_Sans_Tifinagh } from "next/font/google";
import NextLink from "next/link";

const tifinagh = Noto_Sans_Tifinagh({
  subsets: ["tifinagh"],
  weight: "400",
});

export default function Logo() {
  return (
    <NextLink
      href="/"
      className={cn("cursor-pointer text-2xl text-primary", tifinagh.className)}
    >
      <b className="font-black">{Content.Brand}</b>
    </NextLink>
  );
}
