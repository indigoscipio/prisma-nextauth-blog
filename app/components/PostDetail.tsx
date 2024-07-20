"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@prisma/client";
import Link from "next/link";

const PostDetail = ({ post, session }: Post) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeletePost = async (post: Post) => {
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/post/${post.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <h2>{post.content}</h2>
        <p>Posted by {post.author?.name}</p>
      </div>

      {session.user.id == post.authorId ? (
        <div>
          <button
            disabled={isDeleting}
            onClick={() => handleDeletePost(post)}
            className="btn-destructive"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <Link href={`/posts/${post.id}/edit`}>
            <button disabled={isDeleting} className="btn-outlined">
              Edit
            </button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};

export default PostDetail;
