"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Separator,
} from "@/components/Display";
import { Button, Input } from "@/components/Form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
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
  LuTrash,
} from "react-icons/lu";

import { ButtonStyles } from "@/components/Form/Button";
import type { User } from "next-auth";

import { DialogOverlay } from "@radix-ui/react-dialog";
import { signOut } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface HistoryProps {
  className?: string;
  user: User;
}

const Bookmarks: React.FC<HistoryProps> = ({ className, user }) => {
  const bookmarksList = api.bookmarks.list.useQuery();

  const [isOpen, onOpen] = useState<boolean>(true);

  return (
    <>
      <div
        className={cn(
          "absolute left-0 top-1/2 z-50 -translate-y-1/2 p-2 opacity-50 transition-all duration-200 hover:opacity-100",
          isOpen ? "ml-[250px]" : "ml-0",
        )}
      >
        <Button
          variant="default"
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
                <CreateBookmarkButton />
              </div>
            </div>
            <Separator className="mb-2" />
            <div className="flex-1">
              <aside
                className={cn(
                  "no-scrollbar h-full w-full overflow-y-scroll bg-secondary p-4 pt-0 text-accent-foreground",
                  className,
                )}
              >
                <ul className="flex flex-col gap-y-2">
                  {bookmarksList.isLoading && (
                    <li className="animate-pulse rounded-lg bg-white/[.08] px-4 py-6 shadow-lg duration-1000 animate-infinite"></li>
                  )}
                  {bookmarksList.data?.map((bookmark) => (
                    <Link
                      href={`/chat/${bookmark.id}`}
                      className="group h-12 w-full cursor-pointer rounded-lg p-2 hover:bg-muted"
                      key={bookmark.id}
                    >
                      <li className="inline-flex h-full w-full">
                        <div className="w-full truncate">
                          <p className="h-full truncate selection:bg-transparent selection:text-foreground">
                            {bookmark.title}
                          </p>
                        </div>
                        <div className="invisible grid w-12 place-content-center group-hover:visible">
                          <Popover>
                            <PopoverTrigger
                              className={ButtonStyles({
                                variant: "ghost",
                                className:
                                  "!px-2 ring-primary hover:bg-black/30",
                              })}
                            >
                              <LuMoreHorizontal />
                            </PopoverTrigger>
                            <PopoverContent className="w-36 !p-2">
                              <div className="w-full">
                                <EditBookmarkButton
                                  id={bookmark.id}
                                  title={bookmark.title}
                                />
                                <DeleteBookmarkButton id={bookmark.id} />
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
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

// create bookmark button
const CreateBookmarkButton: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const router = useRouter();
  const utils = api.useUtils();
  const bookmarkCreate = api.bookmarks.create.useMutation({
    onError: (err) => alert(err.message),
    onSuccess: (data) => {
      router.push(`/chat/${data.id}`);
      utils.bookmarks.list.refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!!title.length && title.length < 24) {
      bookmarkCreate.mutate({
        title,
      });
    }
  };

  return (
    <Dialog>
      <DialogOverlay />
      <DialogTrigger
        className={ButtonStyles({
          variant: "outline",
          className: "inline-flex w-full items-center justify-between",
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
                <Button type="submit" disabled={bookmarkCreate.isLoading}>
                  Create
                </Button>
              </DialogClose>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// edit  bookmark button
const EditBookmarkButton: React.FC<{ id: string; title: string }> = ({
  id,
  title,
}) => {
  const utils = api.useUtils();
  const updateTitle = api.bookmarks.updateOne.useMutation({
    onSuccess: () => utils.bookmarks.list.refetch(),
    onError: (err) => alert(err.message),
  });
  const [newTitle, setNewTitle] = useState<string>(title);

  return (
    <Dialog>
      <DialogTrigger
        className={ButtonStyles({
          variant: "ghost",
          className: "flex w-full justify-start gap-x-2",
        })}
      >
        <LuPencilLine />
        <span>Edit</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>
            What title would you like for your new bookmark?
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="new title ..."
          defaultValue={title}
          onChange={(e) => setNewTitle(e.target.value)}
          maxLength={20}
        />
        <div className="flex justify-end gap-x-4">
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button
              onClick={() => {
                updateTitle.mutate({ id, title: newTitle });
              }}
            >
              Save
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// delete bookmark button
const DeleteBookmarkButton: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const utils = api.useUtils();
  const deleteBookmark = api.bookmarks.delete.useMutation({
    onSuccess: () => {
      router.push("/chat");
      utils.bookmarks.list.refetch();
    },
    onError: (err) => alert(err.message),
  });

  return (
    <Dialog>
      <DialogTrigger
        className={ButtonStyles({
          variant: "ghost",
          className: "flex w-full justify-start gap-x-2 hover:bg-red-600",
        })}
      >
        <LuTrash />
        <span>Delete</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            conversation.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-x-4">
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => deleteBookmark.mutate({ id })}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Bookmarks;
