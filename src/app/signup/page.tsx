"use client";
import userSignup from "@/lib/userSignup";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;
    if (!name || !password || !email) {
      toast.error("Please fill all fields");
      setIsLoading(false);
      return;
    }
    const login = new Promise((resolve) => {
      resolve(userSignup(name, email, password));
    });
    toast.promise(login, {
      loading: "Please Wait",
      success: (data: any) => data.message,
      error: (err) => err.toString(),
    });
    await login
      .then((data) => console.log(data))
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="flex items-center justify-center pt-[100px]">
      <form
        className="flex flex-col items-center relative max-w-[220px]"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="mb-1">
          Name
        </label>
        <input
          id="name"
          ref={nameRef}
          type="text"
          placeholder="Enter Email"
          name="email"
          required={true}
          className="p-2 w-full rounded-[10px] mb-5 text-black"
        />
        <label htmlFor="email" className="mb-1">
          Email
        </label>
        <input
          id="email"
          ref={emailRef}
          type="email"
          placeholder="Enter Email"
          name="email"
          required={true}
          className="p-2 w-full rounded-[10px] mb-5 text-black"
        />
        <label htmlFor="password" className="mb-1">
          Password
        </label>

        <input
          type="password"
          ref={passwordRef}
          id="password"
          name="password"
          required={true}
          placeholder="Enter Password"
          className="p-2 w-full rounded-[10px] mb-5 text-black"
        />
        <button
          className="bg-purple-500 px-4 py-2 rounded-[10px] disabled:bg-purple-300"
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
