import React from "react";
import { toast } from "react-toastify";
import "./BlogCard.css";
import TransparentBtn from "../ButtonsE/TransparentBtn";
import ColoredBtn from "../ButtonsE/ColoredBtn";
import { Link } from "react-router-dom";

function BlogCard({ img, title, category, date, preview, id }) {
  function truncate(text, maxAllowed) {
    if (text.length > maxAllowed) {
      text = text.slice(0, maxAllowed) + "...";
    }
    return text;
  }
  function generatePreview(text) {
    let startIndex = text.indexOf("<p>");
    let endIndex = text.indexOf("</p>");
    return text.slice(startIndex + 3, endIndex);
  }
  const handleDraft = () => {
    fetch(`/api/move-to-drafts?blog=${id}`, { method: "POST" })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="blog-card">
      <img
        className="blog-card-img"
        src={`http://localhost:5000/uploads/${img}`}
        alt="featured "
      />
      <div className="blog-card-details">
        <p className="blog-card-title">{truncate(title, 80)}</p>
        <div className="blog-card-info">
          <span className="blog-card-author">{category}</span>
          <span className="blog-card-date">{date}</span>
        </div>
        <p className="blog-card-preview">
          {truncate(generatePreview(preview), 60)}
        </p>
        <div className="blog-card-actions">
          <TransparentBtn onClick={handleDraft} text={"Draft"} icon={"draft"} />
          <Link className="nav-link" to={`/editor/${id}`}>
            <ColoredBtn text={"Edit"} icon={"edit"} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
