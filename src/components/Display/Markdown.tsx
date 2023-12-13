import ReactMarkdown, { type Options } from "react-markdown";
import RemarkGfm from "remark-gfm";

import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";

import style from "@/styles/modules/message.module.scss";

import { Button } from "@/components/Form";
import { LuClipboard } from "react-icons/lu";

interface MarkdownProps extends Options {
  content: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content, ...props }) => {
  const copy = (content: string) => navigator.clipboard.writeText(content);

  return (
    <div aria-label="message-content" className={style.message}>
      <ReactMarkdown
        children={content}
        className="space-y-2"
        remarkPlugins={[RemarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className ?? "");
            if (match) {
              return (
                <div className="group relative w-full">
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute right-2 top-2 space-x-2 opacity-0 transition-all group-hover:opacity-100"
                    onClick={() => copy(String(children))}
                  >
                    <span>Copy</span>
                    <LuClipboard />
                  </Button>
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    showLineNumbers={true}
                    style={{ ...theme }}
                  />
                </div>
              );
            } else {
              return (
                <code
                  className={["!whitespace-normal font-sans", className].join(
                    " ",
                  )}
                  {...props}
                >
                  {children}
                </code>
              );
            }
          },
        }}
        {...props}
      />
    </div>
  );
};

export default Markdown;
