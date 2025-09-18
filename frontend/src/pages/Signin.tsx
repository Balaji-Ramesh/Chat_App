import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignin() {
    const response = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) return;
    const newRes = await response.json();
    localStorage.setItem("token", newRes.token);
    console.log("User successfully logged");
    navigate("/chat");
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br  from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <form
        className="bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[350px] flex flex-col space-y-4"
        method="POST"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-2xl font-bold text-gray-100 text-center mb-4">
          Login
        </h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter the email"
          className="p-3 rounded-lg border border-white/40 bg-gray-900/70 placeholder-white/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter the password"
          className="p-3 rounded-lg border border-white/40 bg-gray-900/70  placeholder-white/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSignin}
          className="py-3 rounded-lg bg-gradient-to-r from-gray-900 to-black text-gray-100 font-semibold hover:opacity-90 transition"
        >
          Login
        </button>
        <h3 className="text-gray-300 text-center cursor-pointer">
          New to App. Try to <u onClick={() => navigate("/signup")}>Signup</u>
        </h3>
      </form>
    </div>
  );
}
