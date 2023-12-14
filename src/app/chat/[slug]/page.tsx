import type { NextPage } from "next";
import { Conversation } from "../fragments";
import { getServerAuthSession } from "@/server/auth";

interface ChatPageProps {
  params: { [key: string]: string };
}

const Chat: NextPage<ChatPageProps> = async ({ params: { slug } }) => {
  const session = await getServerAuthSession();

  if (!session?.user) {
    throw new Error("You are trying to access protected content");
  }

  return <Conversation id={slug as string} user={session?.user} />;
};

export default Chat;
