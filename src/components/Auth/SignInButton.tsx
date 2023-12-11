"use client";
import { useCallback } from "react";
import { Button } from "@/components/Form";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

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
  return (
    <Button
      onClick={() => void signIn("google")}
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
