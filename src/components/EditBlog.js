import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const EditBlog = () => {
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://blog-backend-flame.vercel.app/blog/get/${params?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        const json = await response.json();
        if (!json?.isSuccess) {
          throw new Error(json?.message);
        } else {
          setBlog({
            title: json?.blogExists?.name,
            content: json?.blogExists?.content,
            author: json?.blogExists?.author,
          });
        }
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `https://blog-backend-flame.vercel.app/blog/edit/${params?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            title: blog?.title,
            content: blog?.content,
            author: blog?.author,
          }),
        }
      );
      const json = await response.json();
      if (!json?.isSuccess) {
        throw new Error(json.message);
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
    if (!blog?.title || !blog?.content || !blog?.author) {
      alert("Please fill all the required properties");
    } else {
      handleEdit();
    }
  };

  const handleChange = (event) => {
    setBlog({ ...blog, [event.target.name]: event.target.value });
  };

  return (
    <PrivateRoute>
      <div className="body">
      <div className="container">
        <form onSubmit={handleSubmit}>
        <h1>Edit Blog</h1>
        <div className="form">
          <label>Title:</label><br/>
          <input className="input"
            type="text"
            placeholder="eg:Birds"
            name="title"
            onChange={handleChange}
            value={blog?.title}
          /><br/>
          <label>Content:</label><br/>
          <textarea className="input"
            placeholder="Edited Blog Content..."
            name="content"
            onChange={handleChange}
            value={blog?.content}
          /><br/>
          <label>Author:</label><br/>
          <input className="input"
            type="text"
            placeholder="eg:Glenn Quagmire"
            name="author"
            onChange={handleChange}
            value={blog?.author}
          /><br/>
          </div>
          <button className="btn">Edit Blog</button>
        </form>
      </div>
      </div>
    </PrivateRoute>
  );
};

export default EditBlog;
