"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log(response.data);

      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error);

      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl">Verify Email</h1>
      <button
        className={`mt-5 p-2 border border-gray-400 rounded-lg mb-4 bg-black text-white`}
        onClick={verifyUserEmail}
      >
        Verify
      </button>
      {verified && (
        <div>
          <h2>Email Verified Successfully</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
