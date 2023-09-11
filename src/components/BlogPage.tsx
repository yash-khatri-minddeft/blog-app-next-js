import React from "react";
import usePostSlugs from "@/lib/hooks/usePostSlugs";
import usePosts from "@/lib/hooks/usePosts";
import { savePost } from "@/lib/savePost";
import { useState } from "react";
import { toast } from "react-hot-toast";

const BlogPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: blogs, refetch, isLoading: isBlogsLoading } = usePosts();
  const slugs = usePostSlugs(blogs);
  const saveBlogHandler = async () => {
    setIsLoading(true);
    const savedPost = new Promise((resolve) => {
      resolve(savePost(slugs));
    });
    toast.promise(savedPost, {
      loading: "saving post",
      success: (data: any) => data.message,
      error: (err) => err.toString(),
    });
    await savedPost;
    await refetch();
    setIsLoading(false);
  };
  console.log(isLoading);
  console.log("blogs", blogs);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-5 mt-12">
        <button
          onClick={saveBlogHandler}
          disabled={isLoading}
          className="bg-blue-500 px-5 py-1 rounded-md text-black disabled:bg-blue-300 disabled:text-black/70"
        >
          Click
        </button>
        {isBlogsLoading && <span className="text-white">Loading...</span>}
        {slugs?.length ? (
          <ul className="">
            {slugs.map((slug, key) => (
              <li key={key}>{slug}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default BlogPage;
