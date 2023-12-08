"use client";

import { Card } from "@/components/Display";
import { Button, Input, Label } from "@/components/Form";
import { Link } from "@/components/Navigation";
import { calcPasswordStrength } from "@/lib";

import { SignUpSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type Inputs = z.infer<typeof SignUpSchema>;

export default function SignInPage() {
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

  return (
    <Card.Frame className="w-96 border-0 shadow-xl md:border">
      <Card.Header>
        <Card.Title as="h1">Create an account</Card.Title>
        <Card.Description className="text-base">
          Already have an account?{" "}
          <Link href="/auth/sign-in" prefetch>
            Create one here.
          </Link>
        </Card.Description>
      </Card.Header>
      <Card.Content>
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
            <Label
              htmlFor="password"
              className="align-center flex justify-between"
            >
              <span>
                Password:{" "}
                {form.formState.errors.password && (
                  <span className="text-destructive">*</span>
                )}
              </span>
              <div className="flex space-x-1">
                {[...new Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={cn("h-3 w-3 rounded transition-all")}
                    style={{
                      backgroundColor:
                        i + 1 <= strength
                          ? PASSWORD_STRENGTH_COLOR.get(i)
                          : "var(--accent)",
                    }}
                  ></div>
                ))}
              </div>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              className={form.formState.errors.password && "!ring-destructive"}
              {...form.register("password", {
                required: true,
                onChange(e) {
                  setStrength(calcPasswordStrength(e.target.value));
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
              className={
                form.formState.errors.password_conf && "!ring-destructive"
              }
              {...form.register("password_conf", { required: true })}
            />
          </div>

          <Button className="w-fit self-end" type="submit">
            Submit
          </Button>
        </form>
      </Card.Content>
    </Card.Frame>
  );
}

const PASSWORD_STRENGTH_COLOR: Map<number, string> = new Map([
  [0, "#ca240e"],
  [1, "#c14b21"],
  [2, "#b87435"],
  [3, "#af9b48"],
  [4, "#a6c35c"],
  [5, "#9de86e"],
]);
