import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the id parameter from the URL
import Speech from "react-text-to-speech"; // Import the Speech component
import blogs from "../Blogs/blogs.json";

function TextToSpeech() {
  const [blog, setBlog] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language is English

  const { id } = useParams(); // Get the id parameter from the URL

  useEffect(() => {
    // Find the blog with the matching id
    const selectedBlog = blogs.find((item) => item.id === parseInt(id, 10));
    setBlog(selectedBlog);
  }, [id]); // Trigger this effect when the id parameter changes

  // Function to translate text to Hindi
  const translateToHindi = async (text) => {
    try {
      const translation = await translate(text, {
        to: "hi", // Hindi language code
      });
      return translation.text;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Return the original text on error
    }
  };

  const handleSpeak = async () => {
    setIsSpeaking(true);

    if (!blog) {
      return;
    }

    // Translate the blog content to Hindi if selected
    const translatedTitle =
      selectedLanguage === "hi"
        ? await translateToHindi(blog.title)
        : blog.title;
    const translatedDescription =
      selectedLanguage === "hi"
        ? await translateToHindi(blog.description)
        : blog.description;

    setBlog({
      ...blog,
      title: translatedTitle,
      description: translatedDescription,
    });
  };

  const handleStop = () => {
    setIsSpeaking(false);
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-item">
      <h2>{selectedLanguage === "hi" ? "ब्लॉग का शीर्षक" : blog.title}</h2>
      <p>{selectedLanguage === "hi" ? "ब्लॉग का विवरण" : blog.description}</p>
      <p>Author: {blog.author}</p>
      <p>Rating: {blog.rating}</p>
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        {/* Add more language options */}
      </select>
      <button onClick={handleSpeak}>Hear This Blog</button>
      {isSpeaking && (
        <Speech
          text={
            selectedLanguage === "hi"
              ? `${blog.title}। ${blog.author}। ${blog.description}`
              : `${blog.title} by ${blog.author}. ${blog.description}`
          }
          onStart={handleSpeak}
          onEnd={handleStop}
          lang={selectedLanguage === "hi" ? "hi-IN" : "en-US"} // Language code
        />
      )}
    </div>
  );
}

export default TextToSpeech;
