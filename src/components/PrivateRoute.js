import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!context?.isUserLoggedIn && !location.pathname.includes("login")) {
      navigate("/login");
    }
  }, [context?.isUserLoggedIn]);
  if (!context?.isUserLoggedIn) {
    return <h1>Loading...</h1>;
  } else {
    return <>{children}</>;
  }
};

export default PrivateRoute;
