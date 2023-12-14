"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid h-screen w-full place-content-center overflow-hidden">
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center justify-start gap-x-2">
          <h2>Hold on!</h2>
        </div>
        <p className="text-foreground">{error.message}</p>
      </div>
    </div>
  );
}
