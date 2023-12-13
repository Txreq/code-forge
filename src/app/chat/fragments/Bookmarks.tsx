"use client";
import { Button } from "@/components/Form";
import { cn } from "@/lib/utils";
import { useState } from "react";

// icons
import {
  LuArrowLeft,
  LuArrowRight,
  LuFileEdit,
  LuMenu,
  LuMoreHorizontal,
  LuPencil,
  LuPencilLine,
  LuSettings,
  LuX,
} from "react-icons/lu";
import { api } from "@/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Display";

import type { User } from "next-auth";

interface HistoryProps {
  className?: string;
  user: User;
}

const Bookmarks: React.FC<HistoryProps> = ({ className, user }) => {
  const bookmark = api.bookmark.list.useQuery();
  const [isOpen, onOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 p-2 transition-all duration-200",
          isOpen ? "ml-[250px]" : "ml-0",
        )}
      >
        <Button
          variant="ghost"
          className="px-2 text-lg"
          onClick={() => onOpen((prev) => !prev)}
        >
          <span>{isOpen ? <LuArrowLeft /> : <LuArrowRight />}</span>
        </Button>
      </div>
      <div
        className={cn(
          "overflow-x-hidden transition-all duration-200",
          isOpen ? "w-[250px]" : "w-0",
        )}
      >
        <div className="relative z-50 h-full w-full bg-secondary">
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
              <aside
                className={cn(
                  "no-scrollbar h-full overflow-y-scroll bg-secondary p-4 pt-0 text-accent-foreground",
                  className,
                )}
              >
                <ul>
                  {bookmark.data?.map((bookmark) => (
                    <li className="group relative cursor-pointer truncate rounded-lg bg-secondary px-4 py-3 duration-200 hover:bg-white/[.1] hover:shadow-lg">
                      <span>{bookmark.title}</span>
                      <span className="invisible absolute right-2 top-1/2 float-right -translate-y-1/2 rounded-lg bg-accent p-2 shadow-xl transition-all duration-200 hover:bg-background group-hover:visible">
                        <LuMoreHorizontal />
                      </span>
                    </li>
                  ))}
                </ul>
              </aside>
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
      </div>
    </>
  );
};

export default Bookmarks;
