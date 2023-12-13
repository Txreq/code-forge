import { Bookmarks, Conversation } from "./fragments";
import { withAuth } from "@/hocs";

export default withAuth(({ user }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Bookmarks user={user} />
      <div className="flex-1">
        <div className="max-w-screen-full mx-auto h-full">
          <Conversation user={user} />
        </div>
      </div>
    </div>
  );
});
