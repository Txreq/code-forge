"use client";

import { Button, Input, Label } from "@/components/Form";
import { Link } from "@/components/Navigation";
import { type SubmitHandler, useForm } from "react-hook-form";

import type { SignInSchema } from "@/lib/schemas";
import type z from "zod";

type Inputs = z.infer<typeof SignInSchema>;

export default function SignInForm() {
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
    <form
      className="flex flex-col gap-y-4"
      onSubmit={form.handleSubmit(formSubmitHandler)}
    >
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
      <div className="space-y-1.5">
        <Label htmlFor="password">
          Password:{" "}
          {form.formState.errors.password && (
            <span className="text-destructive">*</span>
          )}
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="*******"
          className={form.formState.errors.password && "!ring-destructive"}
          {...form.register("password", { required: true })}
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
