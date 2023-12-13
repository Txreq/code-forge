import React, { useRef, useState } from "react";
import { api } from "@/trpc/react";

import { History, Message, MessageAuthor } from "@/app/chat/fragments";
import { Button, Textarea } from "@/components/Form";
import { Separator } from "@/components/Display";

import { useModel } from "@/hooks";

import Content from "@/content";

// icons
import { LuSend } from "react-icons/lu";

//types
import type { User } from "next-auth";
import type { Answer, Question } from "@prisma/client";
interface ConversationProps {
  user: User;
}
type CurrentQuestion = Partial<Question & { answer: Partial<Answer> }>;

const Conversation: React.FC<ConversationProps> = ({ user }) => {
  const utils = api.useUtils();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const saveQuestionMutation = api.question.save.useMutation();
  const questionsInfiniteQuery = api.question.list.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] =
    useState<CurrentQuestion | null>(null);
  const model = useModel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const input = inputRef.current;
    if (input && input.value.length > 0) {
      const prompt = input.value;
      let answer = "";
      input.value = "";

      setIsProcessing(true);
      setCurrentQuestion(() => ({ content: prompt }));

      model
        .ask(prompt, (chunk) => {
          answer += chunk.response;
          setCurrentQuestion((prev) => ({
            ...prev,
            answer: { content: answer },
          }));
        })
        .then(({ done, answer }) => {
          if (done) {
            saveQuestionMutation.mutate({
              answer,
              prompt,
            });

            setCurrentQuestion(null);
            setIsProcessing(false);

            utils.question.list.setInfiniteData({}, (cache) => {
              if (!cache) return;
              return {
                pages: cache?.pages.map((page) => ({
                  ...page,
                  questions: [
                    ...page.questions,
                    {
                      content: prompt,
                      answer: { content: answer },
                    } as (typeof page.questions)[number],
                  ],
                })),
                pageParams: [],
              };
            });
          }
        })
        .catch((err) => {
          alert("Something went wrong...");
          console.error(err);
        });
    }
  };

  return (
    <div className="flex h-full flex-col">
      {questionsInfiniteQuery.isLoading && !questionsInfiniteQuery.data && (
        <div>Loading ...</div>
      )}

      <div
        aria-label="user-bookmark-history"
        className="flex-1 overflow-x-auto p-4"
      >
        <div className="mx-auto h-full max-w-screen-lg space-y-6 px-2">
          <History
            data={
              questionsInfiniteQuery.data?.pages?.flatMap(
                (page) => page.questions,
              ) ?? []
            }
            user={user}
          />
          {currentQuestion && (
            <>
              <Separator />
              <div className="w-full space-y-4">
                {!!currentQuestion.content && (
                  <Message
                    author={
                      <MessageAuthor
                        src={user.image ?? ""}
                        name={user.name!}
                        placeholder={"🫵"}
                      />
                    }
                    content={currentQuestion.content}
                  />
                )}

                {!!currentQuestion.answer?.content && (
                  <Message
                    author={
                      <MessageAuthor
                        src={""}
                        name={Content.Brand}
                        placeholder={"👽"}
                      />
                    }
                    content={currentQuestion.answer.content}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="z-40 w-full shadow-[0_0px_50px_var(--background)]">
        <div className="mx-auto max-w-screen-lg p-2">
          <form
            className="inline-flex h-full w-full gap-x-2 py-2"
            onSubmit={handleSubmit}
          >
            <Textarea
              className="h-full w-full resize-none"
              ref={inputRef}
              placeholder="Enter prompt ..."
              disabled={isProcessing}
            />
            <div className="h-ful">
              <Button className="h-full" type="submit" disabled={isProcessing}>
                <LuSend />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
