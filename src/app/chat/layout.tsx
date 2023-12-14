import "@/styles/globals.scss";

import Content from "@/content";
import { Bookmarks } from "./fragments";
import { withAuth } from "@/hocs";

export const metadata = {
  title: Content.Brand,
  description: `let ${Content.Brand} assist you with your code!`,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type ChatLayoutProps = {
  children: React.ReactNode;
};

export default withAuth<ChatLayoutProps>(({ user, children }) => (
  <div className="flex h-screen w-screen overflow-hidden">
    <Bookmarks user={user} />
    <div className="flex-1">
      <div className="max-w-screen-full mx-auto h-full">{children}</div>
    </div>
  </div>
));
