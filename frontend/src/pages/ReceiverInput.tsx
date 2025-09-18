import { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";

export default function ReceiverInput() {
  const [receiverId, setReceiverId] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      async function allUsers() {
        if (!searchTerm.trim()) return;
        try {
          const response = await fetch(
            `http://localhost:3000/api/v1/search?username=${searchTerm}`
          );
          if (!response.ok) throw new Error("Failed to fetch users");

          const data = await response.json();
          setSearchResults(data.users || []);
        } catch (error) {
          console.log("Error fetching users: ", error);
        }
      }
      allUsers();
    }, 500);
    return () => clearInterval(timer);
  }, [searchTerm]);

  return (
    <div>
      <h1>Chat Application</h1>
      <input
        placeholder="Enter the user name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchResults.map((user) => (
        <div key={user._id} onClick={() => setReceiverId(user._id)}>
          {user.username}
        </div>
      ))}
      {receiverId && <ChatWindow receiverId={receiverId} />}
    </div>
  );
}
