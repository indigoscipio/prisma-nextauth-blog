import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

type Props = {};

const NavBar = async (props: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex p-4 bg-gray-100 justify-between">
      <Link href="/">
        <h1 className="font-semibold">LOGO</h1>
      </Link>

      {session ? (
        <div className="flex gap-4">
          <span>{session.user?.email}</span>
          <Link href="/profile">My Profile</Link>
          <Link href="/create">
            <button>Create Post +</button>
          </Link>
          <SignOutButton />
        </div>
      ) : (
        <SignInButton />
      )}
    </nav>
  );
};

export default NavBar;
