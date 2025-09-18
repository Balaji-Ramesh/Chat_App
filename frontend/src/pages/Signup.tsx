import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
    const response = await fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    if (!response.ok) return;
    const newRes = await response.json();
    localStorage.setItem("token", newRes.token);
    console.log("New user signed up");
    navigate("/chat");
  }
  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <form
        action="POST"
        onSubmit={(e) => e.preventDefault()}
        className="bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[350px] flex flex-col space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-100 text-center mb-4">
          Sign Up
        </h1>
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter the user name"
          className="p-3 rounded-lg border border-white/40 bg-gray-900/70 placeholder-white/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter the email Id"
          className="p-3 rounded-lg border border-white/40 bg-gray-900/70 placeholder-white/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter the password"
          className="p-3 rounded-lg border border-white/40 bg-gray-900/70 placeholder-white/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSignup}
          className="py-3 rounded-lg bg-gradient-to-r from-gray-900 to-black text-gray-100 font-semibold hover:opacity-90 transition"
        >
          Signup
        </button>
        <h3 className="text-gray-300 text-center cursor-pointer">
          Already have a account. Then{" "}
          <u onClick={() => navigate("/login")}>Login</u>
        </h3>
      </form>
    </div>
  );
}
