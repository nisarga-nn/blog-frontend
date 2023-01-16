import { useState, useEffect } from "react";
import PrivateRoute from "./PrivateRoute";
import { Link } from "react-router-dom";

const ListBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:4000/blog/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        setBlogs(json.blogs);
      } catch (err) {
        throw new Error(`New Error Occured - ${err}`);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/blog/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
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
      <div>
        <h1>List Blogs</h1>
        <div>
          {blogs?.map((item, index) => (
            <div key={index}>
              <Link to="/">
                <h1>{item?.title}</h1>
                <p>{item?.content}</p>
                <h3>~{item?.author}</h3>
              </Link>
              <Link to={`/edit/${item?._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(item?._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ListBlogs;
