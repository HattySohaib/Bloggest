import React, { useState } from "react";
import TransparentBtn from "../ButtonsE/TransparentBtn";
import ColoredBtn from "../ButtonsE/ColoredBtn";
import "./Draft.css";
import { toast } from "react-toastify";
import KebabBtn from "../ButtonsE/KebabBtn";
import { Link } from "react-router-dom";

function Draft({ id, label }) {
  const [menu, setMenu] = useState(false);

  const openMenu = () => {
    setMenu(!menu);
  };

  const handleDelete = () => {
    fetch(`/api/delete-from-drafts?blog=${id}`, { method: "POST" })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handlePublish = () => {
    fetch(`/api/publish-blog?blog=${id}`, { method: "POST" })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="draft">
      <p className="draft-title">{label}</p>
      <div className="draft-actions">
        <Link className="nav-link" to={`/editor/${id}`}>
          <TransparentBtn text={"Edit"} icon={"edit_note"} />
        </Link>
        <ColoredBtn onClick={handlePublish} text={"Publish"} icon={"publish"} />
        <KebabBtn icon={"more_vert"} onClick={openMenu} />
      </div>

      {menu && (
        <>
          <div className="background-layer" onClick={openMenu}></div>
          <div className="kebab-menu">
            <TransparentBtn
              icon={"delete"}
              text={"Delete"}
              onClick={handleDelete}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Draft;
