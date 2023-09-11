import usePosts, { Blog } from "@/lib/hooks/usePosts";
import { useMemo } from "react";

export default function usePostSlugs(blogs: Blog[] | undefined) {
  // if (!blogs) return;
  const slugs = useMemo(() => {
    if (!blogs) return;
    return blogs.map((blog) => blog.slug);
  }, [blogs]);
  import axios from "axios";

  export default async function userLogin(email: string, password: string) {
    try {
      const res = await axios.post("api/user/login", {
        email,
        password,
      });
      console.log("first", res.data);
      if (!res.data.success) throw new Error();
      return res.data;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 404)
        throw new Error(error.response.data.message);
      throw new Error(error);
    }
  }
  return slugs;
}
