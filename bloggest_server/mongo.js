import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const blogSchema = new mongoose.Schema({
  banner: String,
  date: String,
  time: String,
  category: String,
  title: String,
  content: String,
  published: Boolean,
});

const Blog = mongoose.model("Blogs", blogSchema);

export default { Blog };
