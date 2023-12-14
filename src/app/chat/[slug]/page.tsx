import type { NextPage } from "next";
import { Conversation } from "../fragments";
import { getServerAuthSession } from "@/server/auth";

interface ChatPageProps {
  params: Record<string, string>;
}

const Chat: NextPage<ChatPageProps> = async ({ params: { slug } }) => {
  const session = await getServerAuthSession();

  if (!session?.user) {
    throw new Error("You are trying to access protected content");
  }

  return <Conversation id={slug!} user={session.user} />;
};

export default Chat;
