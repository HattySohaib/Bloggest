import dotenv from "dotenv";
dotenv.config();
import path from "path";

import express from "express";

import multer from "multer";
import { connectDb } from "./connection.js";
import mongo from "./mongo.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("public/uploads")); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Preserve the original file extension
    const extension = path.extname(file.originalname);
    cb(null, uniqueFilename + extension); // Use the original file name for storing the file
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/api/save-new-blog", upload.single("banner"), async (req, res) => {
  try {
    const blog = req.body;
    const banner = req.file.filename;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: January is 0
    const day = currentDate.getDate();

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    await mongo.Blog.create({
      banner: banner,
      date: formattedDate,
      time: formattedTime,
      ...blog,
    });
    res.json("Blog added successfully");
  } catch (error) {
    res.send(error);
  }
});

app.post("/api/save-edited-blog", upload.single("banner"), async (req, res) => {
  const blog = req.body;
  if (req.file) {
    const banner = req.file.filename;
    blog.banner = banner;
  }
  await mongo.Blog.updateOne({ _id: req.query.blog }, { ...blog });
  res.json("Saved");
});

app.get("/api/get-drafts", async (req, res) => {
  let drafts = await mongo.Blog.find({ published: false });
  res.json(drafts);
});

app.get("/api/blog-details", async (req, res) => {
  let blog = await mongo.Blog.findOne({ _id: req.query.blog });
  res.json(blog);
});

app.get("/api/get-published", async (req, res) => {
  try {
    let published = await mongo.Blog.find({ published: true });
    res.json(published);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/publish-blog", async (req, res) => {
  await mongo.Blog.updateOne({ _id: req.query.blog }, { published: true });
  res.json("Blog Successfully Published");
});

app.post("/api/move-to-drafts", async (req, res) => {
  await mongo.Blog.updateOne({ _id: req.query.blog }, { published: false });
  res.json("Blog Moved to Drafts");
});

app.post("/api/delete-from-drafts", async (req, res) => {
  await mongo.Blog.deleteOne({ _id: req.query.blog });
  res.json("Blog has been deleted");
});

const start = async () => {
  try {
    connectDb(process.env.MONGO_URL);
    app.listen(5000, () => console.log("Server running successfully"));
  } catch (error) {
    console.log(error);
  }
};

start();
