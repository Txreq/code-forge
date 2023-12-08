"use client";

import { Card } from "@/components/Display";
import { Button, Input, Label } from "@/components/Form";
import { Link } from "@/components/Navigation";

import { SignInSchema } from "@/lib/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type Inputs = z.infer<typeof SignInSchema>;

export default function SignInPage() {
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
    <Card.Frame className="w-96 border-0 md:border">
      <Card.Header>
        <Card.Title as="h1">Sign In</Card.Title>
        <Card.Description className="text-base">
          You don&apos;t have an account?{" "}
          <Link href="/auth/sign-up">Create one here.</Link>
        </Card.Description>
      </Card.Header>
      <Card.Content>
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
          <Button type="submit" disabled={!form.formState.isValid}>
            Submit
          </Button>
        </form>
      </Card.Content>
    </Card.Frame>
  );
}
