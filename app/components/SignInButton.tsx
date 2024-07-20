"use client";
import { signIn } from "next-auth/react";
import React from "react";

type Props = {};

const SignInButton = (props: Props) => {
  return <button onClick={() => signIn()}>Sign In</button>;
};

export default SignInButton;
