"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [hidden, setHidden] = React.useState(true);
    const getType = () => {
      if (type === "password") {
        return hidden ? "password" : "text";
      } else {
        return type;
      }
    };

    return (
      <div className="relative">
        <input
          type={getType()}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded bg-primary/[.10] p-1 transition-all duration-200 active:scale-90"
            onClick={() => setHidden(() => !hidden)}
          >
            {hidden ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
