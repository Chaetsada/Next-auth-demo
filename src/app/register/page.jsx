"use client";
import React, { useState } from "react";
import Container from "../component/Container";
import Navbar from "../component/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const registerPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session} = useSession();

  if(session){
    redirect('/welcome')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all input fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(
          { name, email, password }
        ),
      });

      if (res.ok) {
        setError("");
        setSuccess("User registration successful");
        e.target.reset();
      } else {
        console.log("user registration failed");
      }
      
    } catch (error) {
      console.log("Error during registration : ", error);
    }
  };

  return (
    <Container>
      <Navbar />
      <div className="flex flex-col items-center p-20">
        <h1 className="text-5xl mb-10">Register page</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-[450px]"
        >
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="username">Username</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              name="username"
              type="text"
              placeholder="your name.."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="email">Email</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              name="email"
              type="text"
              placeholder="your email.."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full mb-2">
            <label htmlFor="password">Password</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              name="password"
              type="password"
              placeholder="your password.."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full mb-10">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              className="w-full px-3 py-2 border rounded-md"
              name="confirmpassword"
              type="password"
              placeholder="Confirm password.."
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="w-fit bg-red-500 py-2 px-3 text-white rounded-md mb-5 ">
              {error}
            </div>
          )}
          {success && (
            <div className="w-fit bg-green-500 py-2 px-3 text-white rounded-md mb-5 ">
              {success}
            </div>
          )}
          <button className="w-full py-2 bg-black text-white rounded-md hover:shadow-lg">
            Sign up
          </button>
          <div className="mt-8 flex justify-center">
            <p className="text-gray-500">
              Already have an account ?{" "}
              <Link className="text-blue-500 hover:underline" href="/login">
                login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default registerPage;
