import React from "react";
import CreatePostForm from "../components/CreatePostForm";

type Props = {};

const CreatePostPage = (props: Props) => {
  return (
    <div>
      <h1 className="font-semibold text-2xl">Add a new post</h1>
      <CreatePostForm />
    </div>
  );
};

export default CreatePostPage;
