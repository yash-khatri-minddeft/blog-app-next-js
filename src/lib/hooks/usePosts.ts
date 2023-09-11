import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Blog = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  time: string;
  author: string;
  thumbnailURI: string;
};
const fetchPosts = async () => {
  console.log("hello");
  const res = await axios.get("/api/posts");
  console.log(res.data);
  if (!res.data.success) return [] as Blog[];
  return res.data.blogs as Blog[];
};

export default function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => fetchPosts(),
    refetchInterval: 0,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });
}
