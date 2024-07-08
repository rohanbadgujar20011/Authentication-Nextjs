"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const getUserDetail = async () => {
    try {
      const response = await axios.post("/api/users/profile");
      console.log(response.data);
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

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
      <hr />
      <h2 className="text-blue-600">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />{" "}
      <button
        className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetail}
      >
        Get data
      </button>
      <hr />
      <button
        className="bg-red-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
