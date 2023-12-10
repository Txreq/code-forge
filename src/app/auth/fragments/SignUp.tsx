"use client";

import { Button, Input, Label } from "@/components/Form";
import { Link } from "@/components/Navigation";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { type SubmitHandler, useForm } from "react-hook-form";

import { calcPasswordStrength } from "@/lib";
import type { SignUpSchema } from "@/lib/schemas";
import type z from "zod";

type Inputs = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const [strength, setStrength] = useState<number>(0);
  const form = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formSubmitHandler: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const scales = [];

  for (let i = 0; i < 6; i++) {
    scales.push(
      <div
        key={i}
        className={cn("h-3 w-3 rounded transition-all")}
        style={{
          backgroundColor:
            i + 1 <= strength
              ? PASSWORD_STRENGTH_COLOR.get(i)
              : "var(--accent)",
        }}
      ></div>,
    );
  }

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={form.handleSubmit(formSubmitHandler)}
    >
      {/* email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">
          Email:{" "}
          {form.formState.errors.email && (
            <span className="text-destructive">*</span>
          )}
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          className={form.formState.errors.email && "!ring-destructive"}
          {...form.register("email", { required: true })}
        />
      </div>

      {/* password */}
      <div className="space-y-1.5">
        <Label htmlFor="password" className="align-center flex justify-between">
          <span>
            Password:{" "}
            {form.formState.errors.password && (
              <span className="text-destructive">*</span>
            )}
          </span>
          <div className="flex space-x-1">{scales.map((e) => e)}</div>
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="******"
          className={form.formState.errors.password && "!ring-destructive"}
          {...form.register("password", {
            required: true,
            onChange(e) {
              setStrength(
                calcPasswordStrength(
                  (e as React.ChangeEvent<HTMLInputElement>).target.value,
                ),
              );
            },
          })}
        />
      </div>

      {/* password confirm */}
      <div className="space-y-1.5">
        <Label htmlFor="password_conf">
          Confirm Password:{" "}
          {form.formState.errors.password_conf && (
            <span className="text-destructive">*</span>
          )}
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="******"
          className={form.formState.errors.password_conf && "!ring-destructive"}
          {...form.register("password_conf", { required: true })}
        />
      </div>
      <div className="inline-flex w-full items-center justify-between">
        <Button variant="link">
          <Link href="/">Home</Link>
        </Button>
        <Button className="w-fit self-end" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}

const PASSWORD_STRENGTH_COLOR = new Map([
  [0, "#ca240e"],
  [1, "#c14b21"],
  [2, "#b87435"],
  [3, "#af9b48"],
  [4, "#a6c35c"],
  [5, "#9de86e"],
]);
