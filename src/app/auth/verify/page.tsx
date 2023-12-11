"use client";

import {
  CardContent,
  CardDescription,
  CardFrame,
  CardHeader,
  CardTitle,
} from "@/components/Display";
import { Button, Input } from "@/components/Form";
import { useSession } from "next-auth/react";

const VerifyPage = () => {
  const { data, status } = useSession();
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <CardFrame>
      <CardHeader>
        <CardTitle as="h1">Verify</CardTitle>
        <CardDescription>
          We have sent you an email to{" "}
          <code className="group cursor-default rounded-lg bg-accent p-1 font-mono">
            <span className="blur-sm hover:blur-none">{data?.user.email}</span>
          </code>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formSubmitHandler} className="space-y-2">
          <Input type="text" className="text-center text-2xl" required />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </CardFrame>
  );
};

export default VerifyPage;
