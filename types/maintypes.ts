import type { Post, Session, User } from "@prisma/client";

export interface PostDetailProps {
  post: PostWithAuthor;
  session: SessionWithUser;
}

export interface PostWithAuthor extends Post {
  author?: User;
}

export interface SessionWithUser extends Session {
  user: User;
}
