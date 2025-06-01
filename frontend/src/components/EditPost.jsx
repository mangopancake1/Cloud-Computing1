import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNote, updateNote } from "../utils/api";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
  getPostById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      await updateNote(id, { title, content });
      navigate("/notes");
    } catch (error) {
      console.log("Error updating post:", error);
    }
  };

  const getPostById = async () => {
    try {
      const response = await getNote(id);
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (error) {
      console.log("Error fetching post data:", error);
    }
  };

  return (
    <div
      className="columns is-centered"
      style={{ backgroundColor: "#A9B5DF", minHeight: "100vh", padding: "2rem" }}
    >
      <div className="column is-half">
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
            Edit Note
          </h1>
          <form onSubmit={updatePost}>
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
                Update Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
