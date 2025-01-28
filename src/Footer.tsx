import { FaMicrophone } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { useRef, useState } from "react";
import { _AddHistory, _GenerateText } from "./util/Gemini";
import { useModel } from "./hook/useModel";
import { ConversationT } from "./interface/common";

const fixedHeight = 24;

export default function Footer() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setModel } = useModel();
  const [isSendVisible, setIsSendVisible] = useState(false);
  const [input, setInput] = useState("");
  const onInputChange = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    target.rows = 1;
    target.rows = Math.min(Math.ceil(target.scrollHeight / fixedHeight), 8);
    setIsSendVisible(target.value.length > 0);
    setInput(target.value);
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  const onMicrophoneClick = () => {};

  const onSendClick = async (event: React.FormEvent) => {
    event.preventDefault();

    setModel((prev) => ({
      ...prev,
      conversation: [
        ...prev.conversation,
        { id: Date.now(), type: "user", message: input },
      ],
    }));

    try {
      const responseStream = await _GenerateText(input);

      let accumulatedResponse = "";
      let lastMessageId: number | null = null;

      while (true) {
        const { value, done } = await responseStream.next();
        if (done) break;

        const textChunk = value?.candidates?.[0]?.content.parts
          .map(({ text }) => text)
          .join(" ");

        if (textChunk) {
          _AddHistory(textChunk);
          accumulatedResponse += textChunk;
          setModel((prev) => {
            const updatedConversation = [...prev.conversation];
            if (lastMessageId) {
              const lastAiMessageIndex = updatedConversation.findIndex(
                (msg) => msg.id === lastMessageId
              );
              if (lastAiMessageIndex !== -1) {
                updatedConversation[lastAiMessageIndex].message =
                  accumulatedResponse;
              }
            } else {
              const newMessage = {
                id: Date.now(),
                type: "ai",
                message: accumulatedResponse,
              } as ConversationT;
              lastMessageId = newMessage.id;
              updatedConversation.push(newMessage);
            }
            return { ...prev, conversation: updatedConversation };
          });
        }
      }
    } catch (err) {
      console.error("Error during streaming:", err);
    } finally {
      setInput("");
      if (textareaRef.current && textareaRef.current.rows > 1) {
        textareaRef.current.rows = 1;
      }
    }
  };

  const onImageAttachmentClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
  };

  return (
    <footer className="w-full flex justify-center">
      <form
        onSubmit={onSendClick}
        className="flex h-fit items-end bg-transparent border border-gray-700 py-4 px-6 rounded-2xl gap-2 w-full lg:w-1/3"
      >
        <RiImageAddFill
          size={25}
          onClick={onImageAttachmentClick}
          className="cursor-pointer"
        />
        <textarea
          ref={textareaRef}
          value={input}
          onInput={onInputChange}
          onKeyPress={onKeyPress}
          style={{ lineHeight: "1.5rem" }}
          placeholder="Type a message"
          className="bg-transparent outline-none w-full resize-none px-2"
          rows={1}
        />
        {isSendVisible ? (
          <IoSend
            type="submit"
            size={25}
            onClick={onSendClick}
            className="cursor-pointer"
          />
        ) : (
          <FaMicrophone
            size={25}
            onClick={onMicrophoneClick}
            className="cursor-pointer"
          />
        )}
      </form>
    </footer>
  );
}
