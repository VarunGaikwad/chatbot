import { FaMicrophone } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { _GenerateText } from "./util/Gemini";
import { useModel } from "./hook/useModel";

const fixedHeight = 24;

export default function Footer() {
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

  const onMicrophoneClick = () => { };
  const onSendClick = (event: React.FormEvent) => {
    event.preventDefault();
    _GenerateText(input).then((res) => setModel(prev => ({ ...prev, response: res }))).catch((err) => console.error(err)).finally(() => setInput(""));
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
