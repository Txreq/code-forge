import { Card } from "@/components/Display";
import { Button, Input, Label } from "@/components/Form";
import { Link } from "@/components/Navigation";

export const metadata = {
  title: "Ameslay | Sign Up",
};

export default function SignInPage() {
  return (
    <Card.Frame className="border-0 md:border">
      <Card.Header>
        <Card.Title>
          <h1>Create an account</h1>
        </Card.Title>
        <Card.Description className="text-base">
          Already have an account?{" "}
          <Link href="/auth/sign-in" prefetch>
            Create one here.
          </Link>
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <form className="flex flex-col gap-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email:</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Crate password:</Label>
            <Input id="password" type="password" placeholder="*******" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Confirm password:</Label>
            <Input id="password" type="password" placeholder="*******" />
          </div>
          <Button className="w-fit self-end" type="submit">
            Submit
          </Button>
        </form>
      </Card.Content>
    </Card.Frame>
  );
}
