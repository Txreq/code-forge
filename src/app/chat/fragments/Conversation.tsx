"use client";

import React, { useEffect, useId, useRef, useState } from "react";
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
import { Loading } from "@/components/Feedback";
interface ConversationProps {
  id: string;
  user: User;
}
type CurrentQuestion = Partial<Question & { answer: Partial<Answer> }>;

const Conversation: React.FC<ConversationProps> = ({ id, user }) => {
  // logic
  const utils = api.useUtils();
  const historyContainerId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const saveQuestionMutation = api.question.save.useMutation();
  const questionsInfiniteQuery = api.question.list.useInfiniteQuery(
    { bookmark_id: id },
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
              bookmark_id: id,
            });

            setCurrentQuestion(null);
            setIsProcessing(false);

            utils.question.list.setInfiniteData(
              { bookmark_id: id },
              (cache) => {
                if (!cache) return;
                return {
                  pages: cache?.pages.map((page) => ({
                    ...page,
                    questions: [
                      {
                        content: prompt,
                        answer: { content: answer },
                      } as (typeof page.questions)[number],
                      ...page.questions,
                    ],
                  })),
                  pageParams: [],
                };
              },
            );
          }
        })
        .catch((err) => {
          alert("Something went wrong...");
          console.error(err);
        });
    }
  };

  const historyData =
    questionsInfiniteQuery.data?.pages?.flatMap((page) => page.questions) ?? [];

  // render
  return (
    <div className="relative flex h-full flex-col">
      {questionsInfiniteQuery.isLoading && (
        <div className="absolute left-0 top-0 grid h-screen w-full place-content-center overflow-hidden">
          <Loading />
        </div>
      )}

      <div
        aria-label="user-bookmark-history"
        className="flex-1 overflow-auto overflow-x-auto p-4"
      >
        <div
          className="mx-auto flex h-full max-w-screen-lg flex-col-reverse gap-y-6 space-y-6 overflow-y-scroll px-2"
          id={historyContainerId}
        >
          {currentQuestion && (
            <>
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
                <div className="pb-4"></div>
              </div>
              <Separator />
            </>
          )}
          <History data={historyData} user={user} />
          {questionsInfiniteQuery.hasNextPage &&
            !questionsInfiniteQuery.isFetching && (
              <div className="inline-flex w-full justify-center">
                <Button onClick={() => questionsInfiniteQuery.fetchNextPage()}>
                  Load more
                </Button>
              </div>
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
