import React from "react";
import "./Btn.css";

function TransparentBtn({ onClick, text, icon }) {
  return (
    <button className="btn transparent-btn" onClick={onClick}>
      <span>{text}</span>
      <span className="material-symbols-outlined btn-icon">{icon}</span>
    </button>
  );
}

export default TransparentBtn;
