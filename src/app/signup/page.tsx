"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed", error);
      toast.error(error.response.data.error);
      router.push("/signup");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Enable/disable button based on form inputs
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 border border-gray-400 focus:border-gray-600">
      <Toaster position="top-center" reverseOrder={false} />
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="border border-gray-800 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        type="text"
      />
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="border border-gray-800 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="email"
      />
      <hr />
      <label htmlFor="password">Password</label>
      <input
        className="border border-gray-800 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
      />
      <button
        onClick={onSignup}
        className={`p-2 border border-gray-400 rounded-lg mb-4 bg-black text-white ${
          buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={buttonDisabled || loading}
      >
        {loading ? "Processing..." : "Signup"}
      </button>
    </div>
  );
}
