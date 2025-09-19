import type React from "react";
import type { ChatMessage } from "../hooks/UseChat";

type props = {
  messages: ChatMessage[];
  endRef: React.RefObject<HTMLDivElement | null>;
};

export default function MessageList({ messages, endRef }: props) {
  return (
    <div className="flex flex-col space-y-3 p-4 bg-gray-900 rounded-2xl shadow-lg h-[70vh] w-full max-w-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      {messages.map((message, i) => {
        const currentUserId = localStorage.getItem("userId");
        const isOwn = message.sender === currentUserId;

        return (
          <div
            key={i}
            className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-2xl ${
                isOwn
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-100 rounded-bl-none"
              }`}
            >
              <p className="text-xs opacity-70 mb-1">{message.sender}</p>
              <p className="text-sm">{message.message}</p>
            </div>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
