import {
  CardFrame,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/Display";
import { Link } from "@/components/Navigation";
import { SignInForm } from "../fragments";

export default function SignInPage() {
  return (
    <CardFrame className="w-96 border-0 md:border">
      <CardHeader>
        <CardTitle as="h1">Sign In</CardTitle>
        <CardDescription className="text-base">
          You don&apos;t have an account?{" "}
          <Link href="/auth/sign-up">Create one here.</Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm />
      </CardContent>
    </CardFrame>
  );
}
