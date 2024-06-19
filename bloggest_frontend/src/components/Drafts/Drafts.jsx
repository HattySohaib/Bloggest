import React, { useState, useEffect } from "react";
import Draft from "../Draft/Draft";

function Drafts() {
  const [drafts, setDrafts] = useState([]);
  useEffect(() => {
    fetch("/api/get-drafts", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setDrafts(data))
      .catch((error) => {
        console.log(error);
      });
  }, [drafts]);
  return (
    <section id="drafts">
      <p className="section-header">Drafts</p>
      <div className="drafts-container">
        {!drafts.length && <p className="blank-text">No records found.</p>}
        {drafts.map((e, key) => (
          <Draft key={key} id={e._id} label={e.title} />
        ))}
      </div>
    </section>
  );
}

export default Drafts;
