import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import "./Editor.css";
import { Link, useParams } from "react-router-dom";
import PublishBtn from "../../components/ButtonsE/PublishBtn";
import DraftBtn from "../../components/ButtonsE/DraftBtn";
import ImageBtn from "../../components/ButtonsE/ImageBtn";

export default function Editor() {
  const editor = useRef(null);
  const [cateogry, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [published, setPublished] = useState(false);

  const { blog } = useParams();

  useEffect(() => {
    if (blog) {
      fetch(`/api/blog-details?blog=${blog}`)
        .then((res) => res.json())
        .then((blogData) => {
          setTitle(blogData.title);
          setCategory(blogData.category);
          setContent(blogData.content);
          setPublished(false);
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  }, [blog]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCatChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePublish = () => {
    setPublished(true);
  };

  useEffect(() => {
    if (published) {
      handleAddBlog();
    }
  }, [published]);

  const handleAddBlog = () => {
    const formData = new FormData();
    formData.append("category", cateogry);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("published", published);
    if (selectedFile) {
      formData.append("banner", selectedFile);
      fetch("/api/save-new-blog", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          toast.success(result);
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      toast.warn("Please select a banner image");
    }
  };

  const handleEditBlog = () => {
    const formData = new FormData();
    formData.append("category", cateogry);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("published", published);
    if (selectedFile) {
      formData.append("banner", selectedFile);
    }
    fetch(`/api/save-edited-blog?blog=${blog}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="editorpanel">
      <div className="top">
        <Link to="/" className="back">
          <span class="material-symbols-outlined">arrow_back</span>
          <span>Dashboard</span>
        </Link>
        <ImageBtn onChange={handleFileChange} selectedFile={selectedFile} />
        <select name="categories" id="categories" onChange={handleCatChange}>
          <option disabled value="" selected>
            Select Cateogry
          </option>
          <option value="Sustainability">Sustainability</option>
          <option value="Travel">Travel</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Content Marketing">Content Marketing</option>
        </select>
        <div className="bottom-bar">
          <DraftBtn onClick={blog ? handleEditBlog : handleAddBlog} />
          <PublishBtn onClick={handlePublish} />
        </div>
      </div>
      <input
        id="title"
        name="title"
        type="text"
        autoComplete="off"
        placeholder="Title"
        value={title}
        onChange={handleInputChange}
      />
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {}}
      />
    </div>
  );
}
