import NextAuth from "next-auth";
import type { User, Post } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface Post {
    author?: User;
  }
}
