import { Button } from "@/components/Form";
import { getServerAuthSession } from "@/server/auth";
import { signOut } from "next-auth/react";

export default async function () {
  const session = await getServerAuthSession();
  return (
    <div>
      <pre>{JSON.stringify(session?.user)}</pre>
      <Button>logout</Button>
    </div>
  );
}
