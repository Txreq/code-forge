import type { User } from "next-auth";
import type { RouterOutputs } from "@/trpc/shared";
import { Message, MessageAuthor } from "@/app/chat/fragments";

import Content from "@/content";
import { Separator } from "@/components/Display";

interface HistoryProps {
  data: RouterOutputs["question"]["list"]["questions"];
  user: User;
}

const History: React.FC<HistoryProps> = ({ data, user }) => {
  return (
    <>
      {data.map(({ id, content: question, answer }, idx, arr) => {
        const last = idx === arr.length - 1;
        return (
          <>
            <div key={id} className={`w-full space-y-4 pb-4 ${last && "pb-8"}`}>
              <Message
                author={
                  <MessageAuthor
                    src={user.image ?? ""}
                    name={user.name!}
                    placeholder={"🫵"}
                  />
                }
                content={question}
              />
              <Message
                author={
                  <MessageAuthor
                    src={""}
                    name={Content.Brand}
                    placeholder={"👽"}
                  />
                }
                content={answer.content}
              />
            </div>
            {!last && <Separator key={idx} />}
          </>
        );
      })}
    </>
  );
};

export default History;
