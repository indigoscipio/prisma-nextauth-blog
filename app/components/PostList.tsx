import React from "react";
import type { Post } from "@prisma/client";
import Link from "next/link";

interface Posts {
  posts: Post[];
}

const PostList = ({ posts }: Posts) => {
  if (posts.length === 0) {
    return <h1 className="text-xl">You have no posts...</h1>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {posts.map((post) => (
        <li key={post.id} className="bg-gray-100 p-4">
          <div>
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl">{post.title}</h2>
              <p>{post.content}</p>
              <span>Created by {post.author?.name}</span>
              {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
