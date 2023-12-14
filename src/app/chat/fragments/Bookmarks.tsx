"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Separator,
} from "@/components/Display";
import { Button, Input } from "@/components/Form";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/Overlay";

import { cn } from "@/lib/utils";
import { useState } from "react";

// icons
import { api } from "@/trpc/react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuLogOut,
  LuMoreHorizontal,
  LuPencilLine,
} from "react-icons/lu";

import { ButtonStyles } from "@/components/Form/Button";
import type { User } from "next-auth";

import { signOut } from "next-auth/react";
import { DialogOverlay } from "@radix-ui/react-dialog";
import Link from "next/link";

interface HistoryProps {
  className?: string;
  user: User;
}

const Bookmarks: React.FC<HistoryProps> = ({ className, user }) => {
  const bookmarksList = api.bookmark.list.useQuery();
  const bookmarkCreate = api.bookmark.create.useMutation({
    onError: () => alert("Something went wrong..."),
    onSuccess: () => bookmarksList.refetch(),
  });

  const [isOpen, onOpen] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!!title.length && title.length < 24) {
      bookmarkCreate.mutate({
        title,
      });
    }
  };

  return (
    <>
      <div
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 p-2 opacity-50 transition-all duration-200 hover:opacity-100",
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
          "overflow-hidden transition-all duration-200",
          isOpen ? "w-[250px]" : "w-0",
        )}
      >
        <div className="relative z-50 h-full w-full bg-secondary">
          <div className="flex h-full w-full flex-col">
            <div className="h-fit">
              <div className="p-4">
                <Dialog>
                  <DialogOverlay />
                  <DialogTrigger
                    className={ButtonStyles({
                      variant: "outline",
                      className:
                        "inline-flex w-full items-center justify-between",
                    })}
                  >
                    <span>New chat</span>
                    <LuPencilLine />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Start a new chat...</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="w-full space-y-2">
                        <Input
                          placeholder="title ..."
                          type="text"
                          disabled={bookmarkCreate.isLoading}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <DialogClose>
                            <Button
                              type="submit"
                              disabled={bookmarkCreate.isLoading}
                            >
                              Create
                            </Button>
                          </DialogClose>
                        </div>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Separator className="mb-2" />
            <div className="flex-1">
              <aside
                className={cn(
                  "no-scrollbar h-full overflow-y-scroll bg-secondary p-4 pt-0 text-accent-foreground",
                  className,
                )}
              >
                <ul>
                  {bookmarksList.isLoading && (
                    <li className="animate-pulse rounded-lg bg-white/[.08] px-4 py-6 shadow-lg duration-1000 animate-infinite"></li>
                  )}
                  {bookmarksList.data?.map((bookmark) => (
                    <Link
                      key={bookmark.id}
                      href={`/chat/${bookmark.id}`}
                      className="h-full w-full"
                    >
                      <li className="group relative cursor-pointer truncate rounded-lg bg-secondary px-4 py-3 duration-200 hover:bg-white/[.1] hover:shadow-lg">
                        <span>{bookmark.title}</span>
                        <span className="invisible absolute right-2 top-1/2 float-right -translate-y-1/2 rounded-lg bg-accent p-2 shadow-xl transition-all duration-200 hover:bg-background group-hover:visible">
                          <LuMoreHorizontal />
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </aside>
            </div>
            <Separator className="mt-2" />
            <div className="h-fit">
              <div className="inline-flex h-full w-full items-center justify-between p-4 py-4">
                <Avatar>
                  <AvatarImage src={user.image ?? ""} alt={`@${user.name}`} />
                  <AvatarFallback>🫵</AvatarFallback>
                </Avatar>

                <Dialog>
                  <DialogTrigger
                    className={ButtonStyles({
                      variant: "outline",
                      className: "px-2",
                    })}
                  >
                    <LuLogOut />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Hold on!</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to log out of your account?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="inline-flex justify-end">
                      <DialogClose>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={() => void signOut()}
                      >
                        Logout
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
