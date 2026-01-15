"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "rabeya@123.com" && password === "rabeya123") {
      document.cookie = "auth=true; path=/"; 
      router.push("/items");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
    
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

   
      <div className="text-right">
        <a href="#" className="link link-hover text-sm">
          Forgot password?
        </a>
      </div>


      {error && (
        <p className="text-red-500 text-sm font-medium">{error}</p>
      )}


      <button
        type="submit"
        className="btn btn-neutral w-full mt-2"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
