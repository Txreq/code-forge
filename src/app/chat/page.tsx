import { withAuth } from "@/hocs";

export default withAuth(({ user }) => {
  return <>{JSON.stringify(user)}</>;
});
