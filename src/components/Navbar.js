import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const context = useContext(AuthContext);
  return (
    context?.isUserLoggedIn && (
      <nav className="navbar">
        <Link className="nav-link" to="/">
          BlogsInc.
        </Link>
        <Link className="nav-link" to="/add">
          Add Blog
        </Link>
        <Link
          className="nav-link logout"
          to="/login"
          onClick={context?.handleLogout}
        >
          Log Out
        </Link>
      </nav>
    )
  );
};

export default Navbar;
