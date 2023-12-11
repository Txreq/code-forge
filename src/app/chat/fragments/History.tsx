"use client";
import Image from "next/image";

import { Button } from "@/components/Form";
import { cn } from "@/lib/utils";
import { useState } from "react";

// icons
import { LuFileEdit, LuMenu, LuPencil, LuX } from "react-icons/lu";

interface HistoryProps {
  className?: string;
}

const History: React.FC<HistoryProps> = ({ className }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="hidden p-4 md:visible">
        <Button
          onClick={() => setOpen(true)}
          variant="secondary"
          className="p-2 text-lg"
        >
          <LuMenu />
        </Button>
      </div>
      <aside
        className={cn(
          "h-full bg-secondary p-4 pt-0 text-accent-foreground",
          className,
        )}
      >
        <ul>
          <li className="group relative cursor-pointer truncate rounded-lg bg-secondary px-4 py-3 duration-200 hover:bg-white/[.1] hover:shadow-lg">
            <span>Title</span>
            <span className="invisible absolute right-2 top-1/2 float-right -translate-y-1/2 rounded-lg bg-accent p-2 shadow-xl transition-all duration-200 hover:bg-background group-hover:visible">
              <LuPencil />
            </span>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default History;
