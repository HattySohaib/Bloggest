import React, { useState, useEffect, useRef } from "react";
import BlogCard from "../BlogCardE/BlogCard";
import i from "../../assets/i.jpg";

function Recents() {
  const [published, setPublished] = useState([]);

  useEffect(() => {
    fetch("/api/get-published", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setPublished(data))
      .catch((error) => {
        console.log(error);
      });
  }, [published]);

  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -400, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 400, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };
  return (
    <section id="recent">
      <p className="section-header">Recent Posts</p>
      <button class="scroll-button prev" onClick={scrollLeft}>
        <span class="material-symbols-outlined">navigate_before</span>
      </button>
      <button class="scroll-button next" onClick={scrollRight}>
        <span class="material-symbols-outlined">navigate_next</span>
      </button>
      <div className="recents-container" ref={containerRef}>
        {!published.length && <p className="blank-text">No records found.</p>}
        {published.map((e, key) => (
          <BlogCard
            img={e.banner}
            title={e.title}
            category={e.category}
            date={e.date}
            preview={e.content}
            key={key}
            id={e._id}
          />
        ))}
      </div>
    </section>
  );
}

export default Recents;
