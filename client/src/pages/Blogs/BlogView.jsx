import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Speech from "react-text-to-speech";
import blogs from "./blogs.json";
import Navbar from "../../components/Navbar";

function BlogViewTest() {
  const [blog, setBlog] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const selectedBlog = blogs.find((item) => item.id === parseInt(id, 10));
    setBlog(selectedBlog);
  }, [id]);

  const handleSpeak = () => {
    setIsSpeaking(true);
  };

  const handleStop = () => {
    setIsSpeaking(false);
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-16">
        {" "}
        {/* Adjust the top margin here */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold">{blog.title}</h2>
          <img
            src={blog.image}
            alt={blog.title}
            className="mt-4 w-full rounded-lg"
          />
          <p className="mt-4 text-gray-700">{blog.description}</p>
          <p className="mt-2 text-gray-500">Author: {blog.author}</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
            onClick={handleSpeak}
          >
            Hear This Blog
          </button>
          {isSpeaking && (
            <Speech
              text={`${blog.title} by ${blog.author}. ${blog.description}`}
              onStart={handleSpeak}
              onEnd={handleStop}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default BlogViewTest;
