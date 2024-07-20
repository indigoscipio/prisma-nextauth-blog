import React from "react";
import PostDetail from "@/app/components/PostDetail";
import prisma from "@/lib/prisma";
import type { Post } from "@prisma/client";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";

interface Params {
  params: {
    id: String;
  };
}

const PostDetailsPage = async ({ params }: Params) => {
  const session = await getServerSession(authOptions);

  const post: Post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    return <p>Loading post...</p>;
  }

  return <PostDetail post={post} session={session} />;
};

export default PostDetailsPage;
