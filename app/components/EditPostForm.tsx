"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@prisma/client";

type Props = {
  post: Post;
};

const EditPostForm = ({ post }: Props) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/post/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...post, title, content }),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      router.push(`/posts/${post.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="form-textarea"
          required
        ></textarea>
      </div>

      <div className="form-group">
        <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Post"}
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
