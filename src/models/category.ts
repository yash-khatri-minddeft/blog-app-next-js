import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  postCount: {
    type: Number,
    default: 0,
  },
});

const Category =
  mongoose.models.categories || mongoose.model("categories", categorySchema);
export default Category;
