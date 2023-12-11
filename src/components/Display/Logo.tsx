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
      className={cn(
        "cursor-pointer text-3xl font-black text-primary",
        tifinagh.className,
      )}
    >
      ⵜⴰⵙⴰⴳⵓⵜ
    </NextLink>
  );
}
