import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const AddBlog = () => {
  const [blogDetails, setBlogDetails] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setBlogDetails({ ...blogDetails, [event.target.name]: event.target.value });
  };

  const handleAddBlog = async () => {
    try {
      const response = await fetch("https://blog-backend-flame.vercel.app/blog/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: blogDetails?.title,
          content: blogDetails?.content,
          author: blogDetails?.author,
        }),
      });
      const json = await response.json();
      if (!json?.isSuccess) {
        throw new Error(json?.message);
      } else {
        alert(json?.message);
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!blogDetails?.title || !blogDetails?.content || !blogDetails?.author) {
      alert("Please fill all the required properties");
    } else {
      handleAddBlog();
    }
  };
  return (
    <PrivateRoute>
      <div className="body">
      <div className="container">
        <form onSubmit={handleSubmit}>
        <h1>Add Blog</h1>
        <div className="form">
          <label>Title:</label><br/>
          <input className="input"
            type="text"
            onChange={handleChange}
            name="title"
            placeholder="eg:Nature Blog"
          /><br/>
          <label>Content:</label><br/>
          <textarea className="input"
            name="content"
            placeholder="Write Blog here..."
            onChange={handleChange}
          /><br/>
          <label>Author:</label><br/>
          <input className="input"
            name="author"
            type="text"
            onChange={handleChange}
            placeholder="eg:Glenn Quagmire"
          /><br/>
          </div>
          <button className="btn">Add Blog</button>
        </form>
      </div>
      </div>
    </PrivateRoute>
  );
};

export default AddBlog;
