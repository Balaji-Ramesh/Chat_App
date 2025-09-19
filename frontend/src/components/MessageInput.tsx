import { useState } from "react";

type props = { onSend: (msg: string) => void };

export default function MessageInput({ onSend }: props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    onSend(text);
    setText("");
  };
  return (
    <div className="flex items-center bg-gray-900 p-3 rounded-2xl shadow-lg">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleSend}
        className="ml-3 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold hover:opacity-90 transition"
      >
        Send
      </button>
    </div>
  );
}
