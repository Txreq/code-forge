"use client";

import { Button } from "@/components/Form";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid h-screen w-full place-content-center overflow-hidden">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center justify-start gap-x-2">
          <Image
            height={30}
            width={30}
            src={"/images/warning-sign.png"}
            alt="warning sign"
          />
          <h2>Something went wrong!</h2>
        </div>
        <p className="text-foreground">{error.message}</p>
        <Button onClick={reset}>Try again!</Button>
      </div>
    </div>
  );
}
