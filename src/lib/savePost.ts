import axios from "axios";

export async function savePost(existingSlugs: string[] | undefined) {
  try {
    const res = await axios.post("/api/posts", {
      title: "Amazing Title",
      content: "this is content of blog 3",
      excerpt: "This isexcerpt",
      thumbnailURI:
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png",
      categories: ["tech"],
      existingSlugs,
    });
    console.log("saved", res.data);
    // if (!res.data.success) throw new Error("Error while saving post");
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error while saving post");
  }
}
