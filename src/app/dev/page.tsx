import { Button, Input } from "@/components/Form";
import { redirect } from "next/navigation";

export default function Page() {
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

  return (
    <div className="space-y-4 p-4">
      <div className="h-12 w-12 rounded bg-primary"></div>
      <div className="flex gap-x-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <Input placeholder="some text..." />
    </div>
  );
}
