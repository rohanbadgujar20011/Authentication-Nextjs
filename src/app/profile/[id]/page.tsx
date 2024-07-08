"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
export default function ProfileIdpage({ params }: any) {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-center" reverseOrder={false} />
      <h1>Profile page</h1>
      <h2 className="p-3 bg-green-500 rounded text-black">{params.id}</h2>
      <button
        className="bg-red-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
