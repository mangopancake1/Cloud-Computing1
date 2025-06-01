import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote} from "../utils/api";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const savePost = async (e) => {
    e.preventDefault();
    try {
      await createNote({ title, content })
      navigate("/notes");
    } catch (error) {
      console.error("Error saving post:", error);
      setErrorMessage("Failed to save post. Please try again.");
    }
  };


  return (
    <div
      className="columns is-centered"
      style={{ backgroundColor: "#A9B5DF", minHeight: "100vh", padding: "2rem" }}
    >
      <div className="column is-half">
        {errorMessage && (
          <div className="notification is-danger">{errorMessage}</div>
        )}
        <div
          className="box"
          style={{
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            backgroundColor: "#EAE2C6",
          }}
        >
          <h1
            className="title has-text-centered"
            style={{ color: "#27445D", fontWeight: "bold" }}
          >
            Add New Note
          </h1>
          <form onSubmit={savePost}>
            <div className="field">
              <label className="label" style={{ color: "#27445D" }}>Title</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title here..."
                  required
                  style={{ borderRadius: "8px" }}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" style={{ color: "#27445D" }}>Content</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your content here..."
                  required
                  style={{ borderRadius: "8px" }}
                />
              </div>
            </div>
            <div className="field has-text-centered">
              <button
                type="submit"
                className="button"
                style={{
                  backgroundColor: "#27445D",
                  color: "#ffffff",
                  padding: "12px 18px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  transition: "0.3s",
                  border: "none",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#1F354A")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#27445D")}
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;