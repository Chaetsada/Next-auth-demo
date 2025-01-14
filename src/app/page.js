'use client'
import Navbar from "./component/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="min-h-screen">
      <Navbar session={session} />
      <div className="p-20">
        <h1 className="text-8xl">HOME PAGE</h1>
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
}
