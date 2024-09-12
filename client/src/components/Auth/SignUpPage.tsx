import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for routing

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        email,
        password,
      });
      alert("User registered successfully!");
      navigate("/"); // Redirect to home page after signup
    } catch (err) {
      console.error("Sign-up failed");
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      <button
        onClick={() => navigate("/login")} // Navigate to login page
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
