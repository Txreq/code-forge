import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Markdown,
} from "@/components/Display";

interface MessageAuthorProps {
  name: string;
  src: string;
  placeholder: string;
}

const MessageAuthor: React.FC<MessageAuthorProps> = ({
  name,
  src: avatar,
  placeholder,
}) => {
  return (
    <div
      aria-label="message-author"
      className="inline-flex w-full items-center gap-2"
    >
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback className="text-lg">{placeholder}</AvatarFallback>
      </Avatar>
      <h4>{name}</h4>
    </div>
  );
};

interface MessageProps {
  content: string;
  author: React.ReactElement<MessageAuthorProps>;
}
MessageAuthor.displayName = "MessageAuthor";

const Message: React.FC<MessageProps> = ({ content, author }) => {
  return (
    <div className="flex flex-col gap-y-2">
      {author}
      <Markdown content={content} />
    </div>
  );
};
Message.displayName = "Message";

export { Message, MessageAuthor };
