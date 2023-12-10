import Content from "@/content";
import "@/styles/globals.scss";
import { Metadata } from "next";

export const metadata = {
  title: Content.Brand,
} as Metadata;

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-full overflow-hidden">
      <div className="bg-container animate-fade">
        <div className="bg"></div>
      </div>
      <div className="grid h-full w-full">
        <div className="animate-fade-up place-self-center">
          {props.children}
        </div>
      </div>
    </main>
  );
}
