import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is Required"],
  },
  slug: {
    type: String,
    required: [true, "Slug is Required"],
    unique: true,
  },
  excerpt: {
    type: String,
  },
  content: {
    type: String,
    required: [true, "Content is Required"],
  },
  categories: {
    type: [String],
    required: [true, "Category is Required"],
  },
  time: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: [true, "Author is Required"],
  },
  thumbnailURI: {
    type: String,
    required: [true, "Thumbnail URI is Required"],
  },
});
const Blog = mongoose.models.blogs || mongoose.model("blogs", blogSchema);

export default Blog;
