import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import { useModel } from "./hook/useModel";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

export default function Chatbody() {
  const { model } = useModel(),
    messages = model.conversation || [];

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-body");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [model.conversation]);

  if (!messages.length)
    return (
      <div className="flex-1 flex justify-center items-center text-5xl">
        Hello, My name is PreApeXis
      </div>
    );

  return (
    <div className="chat-body flex-1 flex p-2 justify-center overflow-y-auto scroll-smooth">
      <div className="w-full md:w-3/4">
        {messages.map(({ message, type, id }) => (
          <div
            key={id}
            className={`my-1 flex ${
              type === "ai" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`w-fit ${
                type === "user" ? "bg-gray-900" : ""
              } p-2 px-6 rounded-2xl`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
                className={"prose"}
              >
                {message}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
