'use client'
import React from "react";
import Container from "../component/Container";
import { useSession } from "next-auth/react";
import Navbar from "../component/Navbar";

const welcomePage = () => {
  const { data: session } = useSession();

  console.log(session)
  return (
    <main className="min-h-screen">
      <Navbar session={session} />
      <div className="p-20">
        <h1 className="text-8xl">Welcome {session?.user.name}</h1>
        <p>{session?.user.email}</p>
        <hr className="my-3" />
        <p className="max-w-5xl mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tenetur
          dicta suscipit similique quos, nisi quo pariatur, aperiam ea unde
          fugit quis. Assumenda excepturi deserunt doloribus eos ipsam
          recusandae, quod perspiciatis odio, impedit ad architecto quas sequi
          numquam optio, a ut magni. Quos, officiis minus! Magnam qui excepturi
          laudantium corrupti?
        </p>
      </div>
    </main>
  );
};

export default welcomePage;
