import { useState, useEffect } from "react";
import PrivateRoute from "./PrivateRoute";
import { Link } from "react-router-dom";

const ListBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://blog-backend-flame.vercel.app/blog/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        const json = await response.json();
        setBlogs(json.blogs);
      } catch (err) {
        throw new Error(`New Error Occured - ${err}`);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://blog-backend-flame.vercel.app/blog/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      const filteredData = blogs?.filter((item) => item._id !== id);
      setBlogs(filteredData);
      if (!json?.isSuccess) {
        alert(json?.message);
      } else {
        alert(json?.message);
      }
    } catch (err) {
      alert(err);
      throw err;
    }
  };

  return (
    <PrivateRoute>
      <div className="list-container">
        <h1 className="heading">List Blogs</h1>
        <div className="grid-container">
          {blogs?.map((item, index) => (
            <div className="blog" key={index}>
              <Link className="blog-link" to="/">
                <h1>{item?.title}</h1>
                <p>{item?.content}</p>
                <h3>~{item?.author}</h3>
              </Link>
              <div className="btn-grp">
                <Link to={`/edit/${item?._id}`}>
                  <button className="btn">Edit</button>
                </Link>
                <button className="btn" onClick={() => handleDelete(item?._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ListBlogs;
