import SignInButton from "@/components/Auth/SignInButton";
import {
  CardFrame,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/Display";
import { Link } from "@/components/Navigation";

import type { NextPage } from "next";

const SignInPage: NextPage = () => {
  return (
    <CardFrame className="w-96 border-0 md:border">
      <CardHeader>
        <CardTitle as="h1">Sign In</CardTitle>
        <CardDescription className="text-base">
          You don&apos;t have an account?
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <SignInButton className="w-full" />
      </CardContent>
      <CardFooter className="flex-col items-start text-sm">
        <p>Please consider reading:</p>
        <ul className="list-disc pl-4">
          <li>
            <Link href={"/policies/privacy"}>Privacy policies</Link>
          </li>
          <li>
            <Link href={"/policies/terms"}>Terms and conditions</Link>
          </li>
        </ul>
      </CardFooter>
    </CardFrame>
  );
};

export default SignInPage;
