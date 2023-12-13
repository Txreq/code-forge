import { AnswerSchema } from "@/lib/schemas";
import { useCallback, useReducer, useState } from "react";

import type { z } from "zod";

interface FetchState {
  error?: Error,
  pending: boolean,
  done?: boolean
}

type ResponseChunk = z.infer<typeof AnswerSchema>

export function useModel() {
  const [fetchState, setFetchState] = useReducer((red: Partial<FetchState>, init: Partial<FetchState>) => ({
    ...red,
    ...init
  }), {
    pending: false,
  })

  const [done, setDone] = useState(false)

  const controller = new AbortController()

  const ask = (prompt: string, callback: (chunk: ResponseChunk) => void): Promise<FetchState & { answer: string }> => new Promise(async (resolve, reject) => {
    let fetchState = { pending: true, done: false } as FetchState
    let answer = ""

    try {
      const response = await fetch(new URL("/api/generate", process.env.NEXT_PUBLIC_OLLAMA_API_ENDPOINT), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-form-urlencoded"
        },
        signal: controller.signal,
        body: JSON.stringify({
          prompt,
          model: process.env.NEXT_PUBLIC_OLLAMA_MODEL_NAME,
          stream: true
        })
      })

      const decoder = new TextDecoder()
      const reader = response.body?.getReader()

      if (!response.ok) setFetchState({ error: new Error("We can't process your request right now.") })

      while (true) {
        const chunk = await reader?.read()
        const decodedChunk = decoder.decode(chunk?.value as AllowSharedBufferSource)

        if (!!decodedChunk) {
          console.log(decodedChunk)
          try {
            const obj = JSON.parse(decodedChunk) as ResponseChunk

            fetchState.pending = false
            answer += obj.response;

            callback(obj)
          } catch {

          }
        }

        if (chunk?.done) {
          fetchState = { done: !!chunk.done, pending: false, error: undefined }
          break
        }
      }

      resolve({ ...fetchState, answer })
    } catch (error) {
      reject(error)
      fetchState = { done: undefined, pending: false, error: error as Error }
    }
  })

  return {
    ask
  }
}

export function useArray<T>(initArray: Array<T>) {
  const [arr, setArray] = useState<Array<T>>(initArray)

  const pop = useCallback(() => setArray((prev) => {
    prev.pop()
    return prev
  }), [arr])

  const append = useCallback((item: T) => setArray((prev) => {
    return [...prev, item]
  }), [arr])

  const merge = useCallback((arr: Array<T>) => setArray((prev) => [...prev, ...arr]), [arr])

  return {
    arr,
    pop,
    append,
    merge
  }
}