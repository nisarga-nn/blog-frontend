import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [userDetails, setUserDetails] = useState("");
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        context?.handleLogin();
        navigate("/");
      }
    } catch (err) {
      throw err;
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch("https://https://blog-backend-flame.vercel.app/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userDetails?.email,
          password: userDetails?.password,
        }),
      });
      const json = await response.json();
      if (!json?.isSuccess) {
        throw new Error(json?.message);
      } else {
        alert(json?.message);
        localStorage.setItem("token", json?.token);
        context?.handleLogin();
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userDetails?.email || !userDetails?.password) {
      alert("Email or password is missing");
    } else {
      handleLogin();
    }
  };
  return (
    <div>
        <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} />
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
        <button>Log In</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup">
          <b>Sign Up</b>
        </Link>
      </p>
    </div>
  );
};

export default Login;
