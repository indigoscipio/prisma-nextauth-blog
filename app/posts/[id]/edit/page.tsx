import EditPostForm from "@/app/components/EditPostForm";
import prisma from "@/lib/prisma";
import React from "react";
import type { Post } from "@prisma/client";

interface Params {
  params: {
    id: String;
  };
}

const EditPostPage = async ({ params }: Params) => {
  const post = await prisma.post.findFirst({
    where: {
      id: params.id as string,
    },
  });

  if (!post) {
    return <p>Loading post...</p>;
  }

  return (
    <div>
      <h1>Edit Your Post</h1>
      <EditPostForm post={post} />
    </div>
  );
};

export default EditPostPage;
