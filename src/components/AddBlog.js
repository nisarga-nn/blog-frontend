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
      <div>
        <h1>Add Blog</h1>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            onChange={handleChange}
            name="title"
            placeholder="eg:Nature Blog"
          />
          <label>Content:</label>
          <textarea
            name="content"
            placeholder="Write Blog here..."
            onChange={handleChange}
          />
          <label>Author:</label>
          <input
            name="author"
            type="text"
            onChange={handleChange}
            placeholder="eg:Glenn Quagmire"
          />
          <button>Add Blog</button>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default AddBlog;
