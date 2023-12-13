import { Avatar, AvatarFallback, AvatarImage } from "@/components/Display";
import { Button } from "@/components/Form";
import { Conversation, Bookmarks } from "./fragments";

import { withAuth } from "@/hocs";
import { LuPencilLine, LuSettings } from "react-icons/lu";

export default withAuth(({ user }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="relative z-50 h-full w-[250px] bg-secondary">
        <div className="grid h-full w-full grid-cols-1 gap-y-2">
          <div className="row-span-full row-start-1 row-end-1 w-full p-4">
            <Button
              className="inline-flex w-full justify-between"
              variant="outline"
            >
              <div className="inline-flex items-center gap-x-2">
                <span>New chat</span>
              </div>
              <LuPencilLine />
            </Button>
          </div>
          <div
            style={{
              gridRow: "span 10 / span 10",
            }}
          >
            <Bookmarks className="no-scrollbar h-full overflow-y-scroll" />
          </div>
          <div className="row-span-1">
            <div className="inline-flex h-full w-full items-center justify-between p-4 py-0">
              <Avatar>
                <AvatarImage src={user.image ?? ""} alt={`@${user.name}`} />
                <AvatarFallback>🫵</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="px-2">
                <LuSettings />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* middle */}
      <div className="flex-1">
        <div className="max-w-screen-full mx-auto h-full">
          <Conversation user={user} />
        </div>
      </div>
    </div>
  );
});
