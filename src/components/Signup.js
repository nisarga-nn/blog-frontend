import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [userDetails, setUserDetails] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        "https://blog-backend-flame.vercel.app/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userDetails?.name,
            email: userDetails?.email,
            password: userDetails?.password,
          }),
        }
      );
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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Create New<br/> Account</h1>
        <div className="form">
        <label>Name:</label>
        <br />
        <input className="input"
          type="text"
          placeholder="eg:Peter Griffin"
          onChange={handleChange}
          name="name"
        />
        <br />
        <label>Email:</label>
        <br />
        <input className="input"
          type="email"
          placeholder="eg:xyz@gmail.com"
          onChange={handleChange}
          name="email"
        />
        <br />
        <label>Password:</label>
        <br />
        <input className="input" type="password" onChange={handleChange} name="password" />
        <br /> <label>Conform Password</label>
        <br />
        <input className="input" type="password" onChange={handleChange} name="confirmpassword" />
        <br />
        </div>
        <button className="btn">Sign Up</button>
        <p>
          Have an account?{" "}
          <Link to="/login">
            <b>Log In</b>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
