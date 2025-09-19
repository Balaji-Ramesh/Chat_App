import { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";

type User = {
  _id: string;
  username: string;
};

export default function ReceiverInput() {
  const [receiverId, setReceiverId] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
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
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        💬 Chat Application
      </h1>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md flex flex-col space-y-4">
        {/* Search Input */}
        <input
          placeholder="Enter the user name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded-lg border border-white/30 bg-white/10 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Search Results */}
        <div className="flex flex-col space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {searchResults.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                setReceiverId(user._id);
                setSearchResults([]);
                setSearchTerm("");
              }}
              className="p-3 rounded-lg bg-white/10 text-white cursor-pointer hover:bg-indigo-500 transition"
            >
              {user.username}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="mt-6 w-full max-w-2xl">
        {receiverId && <ChatWindow receiverId={receiverId} />}
      </div>
    </div>
  );
}
