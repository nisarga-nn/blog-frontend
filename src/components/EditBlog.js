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
          `http://localhost:4000/blog/get/${params?.id}`,
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
        `http://localhost:4000/blog/edit/${params?.id}`,
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
      <div>
        <h1>Edit Blog</h1>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            placeholder="eg:Birds"
            name="title"
            onChange={handleChange}
            value={blog?.title}
          />
          <label>Content:</label>
          <textarea
            placeholder="Edited Blog Content..."
            name="content"
            onChange={handleChange}
            value={blog?.content}
          />
          <label>Author:</label>
          <input
            type="text"
            placeholder="eg:Glenn Quagmire"
            name="author"
            onChange={handleChange}
            value={blog?.author}
          />
          <button>Edit Blog</button>
        </form>
      </div>
    </PrivateRoute>
  );
};

export default EditBlog;
