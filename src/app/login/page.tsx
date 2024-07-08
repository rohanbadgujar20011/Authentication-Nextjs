"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonText, setButtonText] = useState("Login");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setButtonText("Processing...");
      setButtonDisabled(true);
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Signin successfully");
      router.push("/profile");
    } catch (error: any) {
      console.log("Authentication Failed", error);
      toast.error(error.response.data.error);
      setButtonText("Login");
      setButtonDisabled(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user.email, user.password]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" flex flex-col items-center justify-center border border-gray-400 p-6 rounded-lg shadow-lg">
        <h1 className="mb-4 text-black">{loading ? "Processing" : "Login"}</h1>
        <hr className="mb-4" />

        <label className="text-black" htmlFor="email">
          Email
        </label>
        <input
          className="border border-gray-800 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
        />
        <label className="text-black" htmlFor="password">
          Password
        </label>
        <input
          className="border border-gray-800 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
        />
        <button
          className={`p-2 border border-gray-400 rounded-lg bg-black text-white ${
            buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={onLogin}
          disabled={buttonDisabled}
        >
          {buttonText}
        </button>
        <Link href={"/signup"} className=" text-blue-700">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Page;
