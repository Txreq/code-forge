import {
  CardFrame,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/Display";
import { Link } from "@/components/Navigation";

import { SignUpForm } from "../fragments";

export default function SignInPage() {
  return (
    <CardFrame className="w-96 border-0 shadow-xl md:border">
      <CardHeader>
        <CardTitle as="h1">Create an account</CardTitle>
        <CardDescription className="text-base">
          Already have an account?{" "}
          <Link href="/auth/sign-in" prefetch>
            Create one here.
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </CardFrame>
  );
}
