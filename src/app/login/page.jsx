"use client";
import React, { useState } from "react";
import Container from "../component/Container";
import Navbar from "../component/Navbar";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import {  useRouter } from "next/navigation";

const loginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data: session} = useSession();

  if(session){
    router.replace('/welcome')
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("invalid credentials");
        return;
      }

      router.replace("welcome");

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Navbar />
      <div className="flex flex-col items-center p-20">
        <h1 className="text-5xl mb-10">Login page</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-[450px]"
        >
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="email">Email</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full mb-8">
            <label htmlFor="password">Password</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="w-fit bg-red-500 py-2 px-3 text-white rounded-md mb-5 ">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded-md hover:shadow-lg"
          >
            Sign In
          </button>
          <div className="mt-8 flex justify-center">
            <p className="text-gray-500">
              No account ?{" "}
              <Link className="text-blue-500 hover:underline" href="/register">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default loginPage;
