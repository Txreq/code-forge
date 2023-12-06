import { Card } from "@/components/Display";
import { Button, Input, Label } from "@/components/Form";
import { Link } from "@/components/Navigation";

export const metadata = {
  title: "Ameslay | Sign In",
};

export default function SignInPage() {
  return (
    <Card.Frame className="border-0 md:border">
      <Card.Header>
        <Card.Title as="h1">Sign In</Card.Title>
        <Card.Description className="text-base">
          You don&apos;t have an account?{" "}
          <Link href="/auth/sign-up">Create one here.</Link>
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email:</Label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password:</Label>
          <Input id="password" type="password" placeholder="*******" />
        </div>
        <Button type="submit">Submit</Button>
      </Card.Content>
    </Card.Frame>
  );
}
