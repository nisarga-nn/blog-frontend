import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const context = useContext(AuthContext);
  return (
    context?.isUserLoggedIn && (
      <nav>
        <Link to="/">
          <img src="favicon.ico" />
          blogInc
        </Link>
        <Link to="/add">Add Blog</Link>
        <Link to="/login" onClick={context?.handleLogout}>
          Log Out
        </Link>
      </nav>
    )
  );
};

export default Navbar;
