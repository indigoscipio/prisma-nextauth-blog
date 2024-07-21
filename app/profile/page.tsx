// @ts-nocheck
import { authOptions } from "@/lib/authOptions";
import React from "react";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";

type Props = {};

const ProfilePage = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      posts: true,
    },
  });

  if (!session) {
    <p>You have no session.</p>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      <h2>My total posts : {user.posts?.length}</h2>
    </div>
  );
};

export default ProfilePage;
