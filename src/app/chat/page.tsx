import { History } from "./fragments";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Logo,
} from "@/components/Display";
import { Button, Input } from "@/components/Form";

import { withAuth } from "@/hocs";
import { LuSend, LuSettings } from "react-icons/lu";

export default withAuth(({ user }) => {
  return (
    <div
      className="grid h-screen w-full grid-cols-12 overflow-hidden"
      style={{
        gridTemplateRows: "repeat(12, minmax(0, 1fr))",
      }}
    >
      <div
        className="relative col-span-2 h-full bg-secondary"
        style={{
          gridRow: "span 12 / span 12",
        }}
      >
        <div
          className="grid h-full w-full grid-cols-1 gap-y-2"
          style={{
            gridTemplateRows: "repeat(12, minmax(0, 1fr))",
          }}
        >
          <div className="row-span-full row-start-1 row-end-1 w-full p-4">
            <Logo />
          </div>
          <div
            style={{
              gridRow: "span 10 / span 10",
            }}
          >
            <History className="h-full overflow-y-scroll" />
          </div>
          <div className="row-span-1">
            <div className="inline-flex h-full w-full items-center justify-between p-4 py-0">
              <Avatar>
                <AvatarImage src={user.image ?? ""} alt={`@${user.name}`} />
                <AvatarFallback>{user.email![0]}</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="px-2">
                <LuSettings />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* middle */}
      <div
        style={{
          gridRow: "span 11 / span 11",
          gridColumn: "span 8 / span 8",
          gridColumnStart: 3,
          height: "100%",
          width: "100%",
        }}
        className="bg-muted"
      ></div>
      <div className="col-span-8 bg-card">
        <div className="inline-flex h-full w-full items-center gap-x-2 p-4">
          <Input placeholder="prompt ..." className="w-full p-4 text-lg" />
          <Button className="px-2">
            <LuSend />
          </Button>
        </div>
      </div>

      {/* far right */}
      <div className="col-span-2 col-start-11 row-span-full bg-secondary"></div>
    </div>
  );
});
