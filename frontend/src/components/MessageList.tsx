import type React from "react";
import type { ChatMessage } from "../hooks/UseChat";

type props = {
  messages: ChatMessage[];
  endRef: React.RefObject<HTMLDivElement | null>;
};

export default function MessageList({ messages, endRef }: props) {
  return (
    <div>
      {messages.map(function (message, i) {
        return (
          <div key={i}>
            <h1>{message.sender}</h1>
            <h2>{message.message}</h2>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
