import type { AnswerSchema } from "@/lib/schemas";
import { api } from "@/trpc/react";
import { useEffect, useReducer, useState } from "react";

import type { z } from "zod";

interface FetchState {
  error?: Error;
  isPending: boolean;
  isProcessing: boolean;
  isDone?: boolean;
}

type ResponseChunk = z.infer<typeof AnswerSchema>;

export function useModel(bookmark_id: string) {
  const utils = api.useUtils();
  const saveQuestionMutation = api.question.save.useMutation({
    onError: (err) => {
      alert("Something didn't workout as expected");
      console.error(err)
    }
  });
  const controller = new AbortController();

  const [fetchState, dispatch] = useReducer(
    (current: FetchState, update: Partial<FetchState>) => ({
      ...current,
      ...update,
    }),
    {
      isPending: false,
      isProcessing: false
    },
  );

  const ask = (
    prompt: string,
    onData?: (chunk: ResponseChunk) => void
  ): Promise<{ prompt: string, answer: string }> =>
    // eslint-disable-next-line
    new Promise(async (resolve, reject) => {
      let answer = "";

      dispatch({ isPending: true, isProcessing: true, isDone: false });
      try {
        const response = await fetch(
          new URL("/api/generate", process.env.NEXT_PUBLIC_OLLAMA_API_ENDPOINT),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-form-urlencoded",
            },
            signal: controller.signal,
            body: JSON.stringify({
              prompt,
              model: process.env.NEXT_PUBLIC_OLLAMA_MODEL_NAME,
              stream: true,
            }),
          },
        );

        const decoder = new TextDecoder();
        const reader = response.body?.getReader();

        if (!response.ok)
          dispatch({
            error: new Error("We can't process your request right now."),
            isPending: false,
          });

        while (true) {
          const chunk = await reader?.read();
          const decodedChunk = decoder.decode(
            chunk?.value as AllowSharedBufferSource,
          );

          if (!!decodedChunk) {
            dispatch({ isPending: false })

            try {
              const obj = JSON.parse(decodedChunk) as ResponseChunk;
              fetchState.isPending = false;
              answer += obj.response;
              if (onData != undefined) onData(obj)
            } catch (err) {
              console.log("CHUNK PARSING ERROR: ", decodedChunk)
              continue;
            }
          }

          if (chunk?.done) {
            dispatch({
              isDone: !!chunk.done,
              isProcessing: false,
              isPending: false,
              error: undefined,
            });
            resolve({ prompt, answer });
            break;
          }
        }

      } catch (error) {
        reject(error);
        dispatch({ isDone: undefined, isPending: false, error: error as Error });
      }
    });


  const save = (_prompt: string, _answer: string, callback: () => void) => {
    if (_answer && _prompt) {
      saveQuestionMutation.mutate({
        prompt: _prompt,
        answer: _answer,
        bookmark_id,
      });

      callback()

      utils.question.list.setInfiniteData(
        { bookmark_id: bookmark_id },
        (cache) => {
          if (!cache) return;
          return {
            pages: cache?.pages.map((page) => ({
              ...page,
              questions: [
                {
                  content: _prompt,
                  answer: { content: _answer },
                } as (typeof page.questions)[number],
                ...page.questions,
              ],
            })),
            pageParams: [],
          };
        },
      );

    }
  };


  const stop = (_prompt: string | null, _answer: string | null, callback: () => void) => {
    const worthSaving =
      _answer && _answer.length > 120 && _prompt && _prompt.length > 0;
    controller.abort("USER CALL");

    if (worthSaving) {
      save(_prompt, _answer, callback);
    }
  };

  useEffect(() => {
    return () => {
      controller.abort("COMPONENT UNMOUNT")
    }
  }, [])

  return {
    ask,
    save,
    stop,
    controller,
    ...fetchState,
  };
}
