"use client";

import { Button } from "@/components/Form";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

// icons
import { FcGoogle } from "react-icons/fc";

interface SignInButtonProps {
  className?: string;
  labelText?: string;
}

export default function SignInButton({
  className,
  labelText = "Sign in with",
}: SignInButtonProps) {
  const signIn = useCallback(async () => {
    (await import("next-auth/react")).signIn("google", {}).catch(() => {
      alert("Failed to sign you in.");
    });
  }, []);

  return (
    <Button
      onClick={signIn}
      variant="outline"
      className={cn("inline-flex gap-x-4", className)}
    >
      <span>{labelText}</span>
      <span>
        <FcGoogle />
      </span>
    </Button>
  );
}
