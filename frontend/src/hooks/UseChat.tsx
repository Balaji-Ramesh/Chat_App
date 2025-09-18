import { useState, useRef, useEffect } from "react";
import { socket } from "../utilities/socket";

export type ChatMessage = {
  sender: string;
  message: string;
};

export function UseChat(receiverId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.auth = { token: localStorage.getItem("token") };
    socket.connect();

    socket.on("connect", () => {
      console.log(`Connected to ${socket.id}`);
    });

    socket.on("sendMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
      console.log("send the message", msg);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection failed:", err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("sendMessage");
      socket.off("connect_error");
      socket.disconnect();
      console.log("🔌 Socket disconnected");
    };
  }, []);

  useEffect(() => {
    if (!receiverId) return;
    fetch(`http://localhost:3000/api/v1/messages/${receiverId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.chat) {
          setMessages((prev) => [...prev, ...data.chat]);
        }
      })
      .catch((err) => console.log(err));
  }, [receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    console.log("hello");
    socket.emit("sendmessage", { receiverId, message });
  };

  return { messages, sendMessage, messagesEndRef };
}
