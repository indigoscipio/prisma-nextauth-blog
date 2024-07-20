import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { revalidatePath } from "@/node_modules/next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: true,
        authorId: body.authorId,
      },
    });

    revalidatePath("/");
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
