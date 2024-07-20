"use client";
import { signOut } from "next-auth/react";
import React from "react";

type Props = {};

const SignOutButton = (props: Props) => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};

export default SignOutButton;
