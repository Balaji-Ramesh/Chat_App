import { useState } from "react";

type props = { onSend: (msg: string) => void };

export default function MessageInput({ onSend }: props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    onSend(text);
    setText("");
  };
  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
