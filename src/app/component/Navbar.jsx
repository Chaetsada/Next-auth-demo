"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = ({ session }) => {
  return (
    <nav className="flex justify-between items-center py-3 px-10">
      <div>
        <Link href="/">NEXT AUTH</Link>
      </div>
      <ul className="flex space-x-3">
        {!session ? (
          <>
            <li>
              <Link href="/login">Sign In</Link>
            </li>
            <li>
              <Link href="/register">Sign Up</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/welcome">My profile</Link>
            </li>
            <li className="hover:cursor-pointer">
              <a onClick={() => signOut()}>logout</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
