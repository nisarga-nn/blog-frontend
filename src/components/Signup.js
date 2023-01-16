import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [userDetails, setUserDetails] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch("https://https://blog-backend-flame.vercel.app/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userDetails?.name,
          email: userDetails?.email,
          password: userDetails?.password,
        }),
      });
      const json = await response.json();
      if (!json?.isSuccess) {
        throw new Error(json?.message);
      } else {
        alert(json?.message);
        navigate("/login");
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
    if (userDetails?.password !== userDetails?.confirmpassword) {
      alert("Password is incorrect");
    } else if (
      !userDetails?.name ||
      !userDetails?.email ||
      !userDetails?.password ||
      !userDetails?.confirmpassword
    ) {
      alert("Please fill all the details");
    } else {
      handleSignUp();
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="eg:Peter Griffin"
          onChange={handleChange}
          name="name"
        />
        <label>Email:</label>
        <input
          type="email"
          placeholder="eg:xyz@gmail.com"
          onChange={handleChange}
          name="email"
        />
        <label>Password:</label>
        <input type="password" onChange={handleChange} name="password" />
        <label>Conform Password</label>
        <input type="password" onChange={handleChange} name="confirmpassword" />
        <button>Sign Up</button>
      </form>
      <p>
        Have an account?{" "}
        <Link to="/login">
          <b>Log In</b>
        </Link>
      </p>
    </div>
  );
};

export default Signup;
