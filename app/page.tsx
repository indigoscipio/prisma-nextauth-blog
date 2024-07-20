import prisma from "@/lib/prisma";
import PostList from "./components/PostList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });

  if (!session) {
    return (
      <main className="container mx-auto p-4">
        <h1>Simple Blog App</h1>
        <p>Please sign in in order to proceed...</p>
      </main>
    );
  }

  if (!posts) {
    return <p>Loading posts...</p>;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Your Post Feed</h1>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <PostList posts={posts} />
    </main>
  );
}
