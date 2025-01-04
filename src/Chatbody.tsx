export default function Chatbody() {
  const messages = [
    {
      message: "Hello, Varun",
      type: "user",
    },
    {
      message: "Hello, Varun",
      type: "ai",
    },
    {
      message: "Hello, Varun",
      type: "user",
    },
  ];

  if (!messages.length)
    return (
      <div className="flex-1 flex justify-center items-center text-5xl">
        Hello, Varun
      </div>
    );

  return (
    <div className="flex-1 flex p-2 justify-center">
      <div className="w-full md:w-3/4">
        {messages.map(({ message, type }) => (
          <div
            className={`flex ${
              type === "ai" ? "justify-start" : "justify-end"
            }`}
          >
            <p className={`w-fit ${type === "user" ? "bg-gray-900" : ""} p-2 px-6 rounded-2xl`}>{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
