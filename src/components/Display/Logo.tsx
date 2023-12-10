import { cn } from "@/lib/utils";
import { Noto_Sans_Tifinagh } from "next/font/google";

const tifinagh = Noto_Sans_Tifinagh({
  subsets: ["tifinagh"],
  weight: "400",
});

export default function Logo() {
  return (
    <div className={cn("text-3xl font-black text-primary", tifinagh.className)}>
      ⵜⴰⵙⴰⴳⵓⵜ
    </div>
  );
}
