"use client";

import { api } from "@/trpc/react";
import React, { useId, useRef, useState } from "react";

import { History, Message, MessageAuthor } from "@/app/chat/fragments";
import { Separator } from "@/components/Display";
import { Button, Textarea } from "@/components/Form";

import { useModel } from "@/hooks";

import Content from "@/content";

// icons
import { LuSend, LuStopCircle } from "react-icons/lu";

//types
import { Loading } from "@/components/Feedback";
import type { Answer, Question } from "@prisma/client";
import type { User } from "next-auth";
interface ConversationProps {
  id: string;
  user: User;
}
type CurrentQuestion = Partial<Question & { answer: Partial<Answer> }>;

const Conversation: React.FC<ConversationProps> = ({
  id: bookmark_id,
  user,
}) => {
  // logic
  const historyContainerId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [prompt, setPrompt] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);

  const questionsInfiniteQuery = api.question.list.useInfiniteQuery(
    { bookmark_id },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const model = useModel(bookmark_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const input = inputRef.current;
    if (input && input.value.length > 0) {
      const prompt = input.value;
      let answer = "";
      input.value = "";

      setPrompt(prompt);
      model
        .ask(prompt, function onData(chunk) {
          answer += chunk.response;
          setAnswer(() => answer);
        })
        .then(({ answer }) => {
          model.save(prompt, answer, () => {
            setPrompt(null);
            setAnswer(null);
          });
        })
        .catch((err) => {
          alert("Something went wrong...");
          console.error(err);
        });
    }
  };

  const stop = () => {
    model.stop(prompt, answer, function onStop() {
      setPrompt(null);
      setAnswer(null);
    });
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
          {prompt && (
            <>
              <div className="w-full space-y-4" aria-label="current-message">
                <Message
                  author={
                    <MessageAuthor
                      src={user.image ?? ""}
                      name={user.name!}
                      placeholder={"🫵"}
                    />
                  }
                  content={prompt}
                />
                {answer && (
                  <Message
                    author={
                      <MessageAuthor
                        src={""}
                        name={Content.Brand}
                        placeholder={"👽"}
                      />
                    }
                    content={answer}
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
              disabled={model.isProcessing}
            />
            <div className="h-ful">
              <Button
                className="h-full"
                type={model.isProcessing ? "button" : "submit"}
                onClick={model.isProcessing ? stop : undefined}
              >
                {model.isProcessing ? <LuStopCircle /> : <LuSend />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
