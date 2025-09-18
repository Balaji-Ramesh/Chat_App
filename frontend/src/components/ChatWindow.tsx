import { UseChat } from "../hooks/UseChat";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

type props = { receiverId: string };

export default function ChatWindow({ receiverId }: props) {
  const { messages, sendMessage, messagesEndRef } = UseChat(receiverId);
  return (
    <div>
      <MessageList messages={messages} endRef={messagesEndRef} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
